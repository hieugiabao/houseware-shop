import { Injectable } from '@angular/core';
import {
  ApiErrorDto,
  ApiResponse,
  TokenResultResponse,
} from '@shop/shared/data-access/models';
import { CustomerAuthApiService } from '@shop/shared/data-access/shop-api';
import { LuxonUtil } from '@shop/shared/utilities/misc';
import { handleApiResponse } from '@shop/shared/utilities/rx';
import {
  pipe,
  Subscription,
  tap,
  timer,
  switchMap,
  EMPTY,
  Observable,
  of,
  catchError,
  throwError,
  forkJoin,
  map,
  withLatestFrom,
} from 'rxjs';
import { AuthStateService } from '../state/auth-state.service';
import { LocalStorageService } from './local-storage.service';
import { RedirectService } from './redirect.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private jwtSubscriptions!: Subscription;

  constructor(
    private readonly authStateService: AuthStateService,
    private readonly customerAuthApiService: CustomerAuthApiService,
    private readonly localStorageService: LocalStorageService,
    private readonly redirectService: RedirectService
  ) {}

  private afterRequestToken = () => {
    return pipe(
      tap<[TokenResultResponse, boolean]>(
        ([{ refreshToken, expiresIn }, rememberMe]) => {
          if (rememberMe) {
            this.localStorageService.set('rtok', refreshToken || '');
            this.setupRefreshTimer(
              LuxonUtil.fromDateToJSDate(
                new Date(Date.now() + expiresIn * 1000)
              )
            );
          }
        }
      ),
      withLatestFrom(this.authStateService.currentUser$),
      switchMap(([[tokenRequest], currentUser]) => {
        this.authStateService.set({
          accessToken: tokenRequest.accessToken,
          tokenType: tokenRequest.tokenType,
          expiresIn: LuxonUtil.fromDateToJSDate(
            new Date(Date.now() + tokenRequest.expiresIn * 1000)
          ),
          user: currentUser,
        });

        if (!currentUser) {
          return this.customerAuthApiService
            .me()
            .pipe(switchMap((user) => forkJoin([of(tokenRequest), of(user)])));
        }

        return forkJoin([of(tokenRequest), of(currentUser)]);
      }),
      map(([tokenRequest, user]) => {
        this.authStateService.set({
          accessToken: tokenRequest.accessToken,
          tokenType: tokenRequest.tokenType,
          expiresIn: LuxonUtil.fromDateToJSDate(
            new Date(Date.now() + tokenRequest.expiresIn * 1000)
          ),
          user,
        });
        return tokenRequest;
      })
    );
  };

  private setupRefreshTimer(expiresAt: Date) {
    const expiry = LuxonUtil.fromDate(expiresAt);
    const diffInMilli = expiry.minus({ minute: 1 }).diffNow().milliseconds;
    // reset if timer is already running
    this.jwtSubscriptions?.unsubscribe();

    // setup timer
    this.jwtSubscriptions = timer(diffInMilli)
      .pipe(switchMap(this.refreshToken.bind(this)))
      .subscribe();
  }

  refreshToken(): Observable<never> | Observable<TokenResultResponse> {
    const token = this.localStorageService.get('rtok');
    if (!token) {
      this.authStateService.reset();
      return EMPTY;
    }

    return this.customerAuthApiService
      .refresh({ token })
      .pipe(
        catchError((err: ApiErrorDto) => {
          if (err.statusCode === 401) {
            this.localStorageService.remove('rtok');
            this.redirectService.redirectToLogin();
          }

          this.authStateService.reset();
          return throwError(() => err);
        }),
        switchMap((tokenRequest) => {
          return forkJoin([of(tokenRequest), of(true)]);
        })
      )
      .pipe(this.afterRequestToken());
  }

  retrieveTokenOnPageLoad(): void {
    this.refreshToken().pipe().subscribe();
  }

  login(
    email: string,
    password: string,
    rememberMe = true
  ): Observable<ApiResponse<TokenResultResponse>> {
    return handleApiResponse<TokenResultResponse>(
      this.customerAuthApiService
        .login({ email, password })
        .pipe(
          switchMap((tokenRequest) =>
            forkJoin([of(tokenRequest), of(rememberMe)])
          )
        )
        .pipe(this.afterRequestToken()),
      null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err: any) => {
        return err.message;
      }
    );
  }

  logout() {
    const token = this.localStorageService.get('rtok');

    return handleApiResponse<void>(
      this.customerAuthApiService.logout({ refreshToken: token }),
      null
    );
  }
}
