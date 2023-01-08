import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponseBase,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AppConfig, APP_CONFIG } from '@shop/shared/app-config';
import {
  PaginateParamsDto,
  PaginateResultResponse,
  Product,
} from '@shop/shared/data-access/models';
import { StringUtil } from '@shop/shared/utilities/string';
import { Observable, mergeMap, catchError, throwError } from 'rxjs';
import { BaseApiService } from './base-api';

@Injectable({ providedIn: 'root' })
export class ProductsApiService extends BaseApiService {
  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private httpClient: HttpClient
  ) {
    super();
  }

  getProducts(
    params: PaginateParamsDto
  ): Observable<PaginateResultResponse<Product>> {
    let url = this.appConfig.baseURL + '/products';
    url = url.replace(/[?&]$/, ''); // remove any trailing ? or &

    return this.httpClient
      .request('get', url, {
        observe: 'response',
        responseType: 'blob',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        params: new HttpParams({
          fromObject: StringUtil.convertKeysFromCamelCaseToSnakeCase(params),
        }),
      })
      .pipe(
        mergeMap((response) =>
          this.process<PaginateResultResponse<Product>>(response, 200)
        )
      )
      .pipe(
        catchError((response) => {
          if (response instanceof HttpResponseBase) {
            try {
              return this.process<PaginateResultResponse<Product>>(response);
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
