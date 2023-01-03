import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AuthService,
  AuthStateService,
  RedirectService,
} from '@shop/auth/data-access';
import { ApiException } from '@shop/shared/data-access/models';
import { LuxonUtil } from '@shop/shared/utilities/misc';
import {
  catchError,
  combineLatest,
  concat,
  defer,
  mergeMap,
  Observable,
  retry,
  take,
  throwError,
} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private allowed = [
    '/auth/refresh',
    '/assets',
    '/admin/auth/refresh',
    'auth/login',
  ];

  constructor(
    private readonly authStateService: AuthStateService,
    private readonly redirectService: RedirectService,
    private readonly authService: AuthService
  ) {}

  private static addToken(req: HttpRequest<unknown>, token: string) {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  private newTokenToClonedRequest(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ) {
    return this.authStateService.token$.pipe(
      mergeMap((newToken) =>
        next.handle(AuthInterceptor.addToken(req, newToken))
      )
    );
  }

  private refreshToClonedRequest(req: HttpRequest<unknown>, next: HttpHandler) {
    return concat(
      this.authService.refreshToken(),
      this.newTokenToClonedRequest(req, next)
    );
  }

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.allowed.some((url) => req.url.includes(url))) {
      return next.handle(req);
    }

    let hasRetried = false;
    return combineLatest([
      this.authStateService.token$,
      this.authStateService.tokenExpiry$,
    ]).pipe(
      take(1),
      mergeMap(([token, expiry]) => {
        if (!token) return next.handle(req);

        const cloned = AuthInterceptor.addToken(req, token);
        return defer(() => {
          if (expiry && LuxonUtil.isInThePast(expiry)) {
            return this.refreshToClonedRequest(req, next) as Observable<
              HttpEvent<unknown>
            >;
          }

          return next.handle(cloned).pipe(
            retry({
              count: 1,
              delay: (err: ApiException) => {
                if (err.status === 401 && !hasRetried) {
                  hasRetried = true;
                  return this.refreshToClonedRequest(req, next) as Observable<
                    HttpEvent<unknown>
                  >;
                }
                return throwError(() => err) as Observable<HttpEvent<unknown>>;
              },
            })
          );
        }).pipe(
          catchError((err) => {
            if (ApiException.isApiException(err)) {
              if (err.status === 401) {
                this.authService.logout().subscribe({
                  complete: () => {
                    this.redirectService.redirectToLogin();
                  },
                });
              } else if (err.status === 403)
                this.redirectService.redirectToNotAuthorized();
            }
            return throwError(() => err) as Observable<HttpEvent<unknown>>;
          })
        );
      })
    );
  }
}

export const authInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
