import { Injectable } from '@angular/core';
import {
  ApiErrorDto,
  ApiResponse,
  TokenResultResponse,
} from '@shop/shared/data-access/models';
import { CustomerAuthApiService } from '@shop/shared/data-access/shop-api';
import { LocalStorageService, RedirectService } from '@shop/shared/services';
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
} from 'rxjs';
import { AuthStateService } from '../state/auth-state.service';

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
      tap<TokenResultResponse>(({ refreshToken, expiresIn }) => {
        this.localStorageService.set('rtok', refreshToken || '');
        this.setupRefreshTimer(expiresIn);
      }),
      switchMap((tokenRequest) => {
        this.authStateService.set({
          accessToken: tokenRequest.accessToken,
          tokenType: tokenRequest.tokenType,
          expiresIn: LuxonUtil.fromDateToJSDate(tokenRequest.expiresIn),
          user: tokenRequest.user,
        });

        return of(tokenRequest);
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
      this.redirectService.redirectToLogin();
      return EMPTY;
    }

    return this.customerAuthApiService.refresh({ token }).pipe(
      catchError((err: ApiErrorDto) => {
        if (err.statusCode === 401) {
          this.redirectService.redirectToLogin();
        }

        this.authStateService.reset();
        return throwError(() => err);
      }),
      this.afterRequestToken()
    );
  }

  login(
    email: string,
    password: string
  ): Observable<ApiResponse<TokenResultResponse>> {
    return handleApiResponse<TokenResultResponse>(
      this.customerAuthApiService
        .login({ email, password })
        .pipe(this.afterRequestToken()),
      null,
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
