import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AppConfig, APP_CONFIG } from '@shop/shared/app-config';
import { Address } from '@shop/shared/data-access/models';
import { BaseApiService } from './base-api';

@Injectable({ providedIn: 'root' })
export class AddressApiService extends BaseApiService {
  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) {
    super();
  }

  getAddresses() {
    let url = this.appConfig.baseURL + '/customer/addresses';
    url = url.replace(/[?&]$/, ''); // remove any trailing ? or &

    return this.httpClient
      .request('get', url, {
        observe: 'response',
        responseType: 'blob',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        // withCredentials: true,
      })
      .pipe(this.handleResponse<any>(200));
  }

  updateAddress(params: Address) {
    let url = this.appConfig.baseURL + '/customer/addresses/' + params.id;
    url = url.replace(/[?&]$/, ''); // remove any trailing ? or &

    return this.httpClient
      .request('post', url, {
        observe: 'response',
        responseType: 'blob',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        body: params,
        // withCredentials: true,
      })
      .pipe(this.handleResponse<any>(200));
  }
}
