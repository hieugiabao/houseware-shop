/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AppConfig, APP_CONFIG } from '@shop/shared/app-config';
import {
  CustomerInfomation,
  LoginParamsDto,
  RegisterParamsDto,
  TokenResultResponse,
  UpdateCustomerParamsDto,
  UpdatePasswordParamsDto,
} from '@shop/shared/data-access/models';
import { StringUtil } from '@shop/shared/utilities/string';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api';

@Injectable({ providedIn: 'root' })
export class CustomerAuthApiService extends BaseApiService {
  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private httpClient: HttpClient
  ) {
    super();
  }

  register(body: RegisterParamsDto): Observable<void> {
    let url = this.appConfig.baseURL + '/auth/register';
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
      .pipe(this.handleResponse<void>(201));
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
      .pipe(this.handleResponse<TokenResultResponse>(200));
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
      .pipe(this.handleResponse<void>(204));
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
      .pipe(this.handleResponse<TokenResultResponse>(200));
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
      .pipe(this.handleResponse<CustomerInfomation | null>(200));
  }

  updateMe(body: UpdateCustomerParamsDto): Observable<UpdateCustomerParamsDto> {
    let url = this.appConfig.baseURL + '/customer/info';
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
      .pipe(this.handleResponse<UpdateCustomerParamsDto>(200));
  }

  changePassword(
    body: UpdatePasswordParamsDto
  ): Observable<UpdatePasswordParamsDto> {
    let url = this.appConfig.baseURL + '/customer/change-password';
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
      .pipe(this.handleResponse<UpdatePasswordParamsDto>(200));
  }
}
