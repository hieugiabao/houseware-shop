/* eslint-disable @typescript-eslint/no-explicit-any */
import { mergeMap, Observable, catchError, throwError } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponseBase,
} from '@angular/common/http';
import { AppConfig, APP_CONFIG } from '@shop/shared/app-config';
import { BaseApiService } from './base-api';
import {
  CustomerInfomation,
  LoginParamsDto,
  TokenResultResponse,
} from '@shop/shared/data-access/models';
import { StringUtil } from '@shop/shared/utilities/string';

@Injectable({ providedIn: 'root' })
export class CustomerAuthApiService extends BaseApiService {
  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private httpClient: HttpClient
  ) {
    super();
  }

  login(body: LoginParamsDto): Observable<TokenResultResponse> {
    let url = this.appConfig.baseURL + '/auth/login';
    url = url.replace(/[?&]$/, ''); // remove any trailing ? or &

    return this.httpClient
      .request('post', url, {
        body: JSON.stringify(
          StringUtil.convertKeysFromCamelCaseToSnakeCase(body)
        ),
        observe: 'response',
        responseType: 'blob',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      })
      .pipe(
        mergeMap((response: any) =>
          this.process<TokenResultResponse>(response, 200)
        )
      )
      .pipe(
        catchError((response) => {
          if (response instanceof HttpResponseBase) {
            try {
              return this.process<never>(response);
            } catch (e) {
              return throwError(() => e);
            }
          } else {
            return throwError(() => response);
          }
        })
      );
  }

  logout(body: { refreshToken?: string }): Observable<void> {
    let url = this.appConfig.baseURL + '/auth/logout';
    url = url.replace(/[?&]$/, ''); // remove any trailing ? or &

    return this.httpClient
      .request('post', url, {
        body: JSON.stringify(
          StringUtil.convertKeysFromCamelCaseToSnakeCase(body)
        ),
        observe: 'response',
        responseType: 'blob',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      })
      .pipe(mergeMap((response) => this.process<void>(response, 204)))
      .pipe(
        catchError((response) => {
          if (response instanceof HttpResponseBase) {
            try {
              return this.process<never>(response);
            } catch (e) {
              return throwError(() => e);
            }
          } else {
            return throwError(() => response);
          }
        })
      );
  }

  refresh(body: { token: string }): Observable<TokenResultResponse> {
    let url = this.appConfig.baseURL + '/auth/refresh';
    url = url.replace(/[?&]$/, ''); // remove any trailing ? or &

    return this.httpClient
      .request('post', url, {
        observe: 'response',
        responseType: 'blob',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + body.token,
        }),
      })
      .pipe(
        mergeMap((response) => this.process<TokenResultResponse>(response, 200))
      )
      .pipe(
        catchError((response) => {
          if (response instanceof HttpResponseBase) {
            try {
              return this.process<never>(response);
            } catch (e) {
              return throwError(() => e);
            }
          } else {
            return throwError(() => response);
          }
        })
      );
  }

  me(): Observable<CustomerInfomation | null> {
    let url = this.appConfig.baseURL + '/auth/me';
    url = url.replace(/[?&]$/, ''); // remove any trailing ? or &

    return this.httpClient
      .get(url, {
        observe: 'response',
        responseType: 'blob',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      })
      .pipe(
        mergeMap((response) =>
          this.process<CustomerInfomation | null>(response, 200)
        )
      )
      .pipe(
        catchError((response) => {
          if (response instanceof HttpResponseBase) {
            try {
              return this.process<never>(response);
            } catch (e) {
              return throwError(() => e);
            }
          } else {
            return throwError(() => response);
          }
        })
      );
  }
}
