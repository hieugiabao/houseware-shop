import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AppConfig, APP_CONFIG } from '@shop/shared/app-config';
import { Cart } from '@shop/shared/data-access/models';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api';

@Injectable({ providedIn: 'root' })
export class CartApiService extends BaseApiService {
  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private httpClient: HttpClient
  ) {
    super();
  }

  getCart(): Observable<Cart> {
    let url = this.appConfig.baseURL + '/carts';
    url = url.replace(/[?&]$/, ''); // remove any trailing ? or &

    return this.httpClient
      .request('get', url, {
        observe: 'response',
        responseType: 'blob',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        withCredentials: true,
      })
      .pipe(this.handleResponse<Cart>(200));
  }

  addToCart(params: { product: number; quantity: number }): Observable<Cart> {
    let url = this.appConfig.baseURL + '/carts';
    url = url.replace(/[?&]$/, ''); // remove any trailing ? or &

    return this.httpClient
      .post(url, params, {
        observe: 'response',
        responseType: 'blob',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        withCredentials: true,
      })
      .pipe(this.handleResponse<Cart>(200));
  }

  updateCartItem(rowId: string, quantity: number): Observable<Cart> {
    let url = this.appConfig.baseURL + '/carts/' + rowId;
    url = url.replace(/[?&]$/, ''); // remove any trailing ? or &

    return this.httpClient
      .request('post', url, {
        observe: 'response',
        responseType: 'blob',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        withCredentials: true,
        body: { quantity },
      })
      .pipe(this.handleResponse<Cart>(200));
  }

  removeCartItem(rowId: string): Observable<{ message: string }> {
    let url = this.appConfig.baseURL + '/carts/' + rowId;
    url = url.replace(/[?&]$/, ''); // remove any trailing ? or &

    return this.httpClient
      .request('delete', url, {
        observe: 'response',
        responseType: 'blob',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        withCredentials: true,
      })
      .pipe(this.handleResponse<{ message: string }>(200));
  }
}
