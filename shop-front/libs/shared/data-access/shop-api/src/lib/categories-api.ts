import { AppConfig, APP_CONFIG } from '@shop/shared/app-config';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponseBase,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseApiService } from './base-api';
import { catchError, mergeMap, Observable, throwError } from 'rxjs';
import {
  Category,
  PaginateParamsDto,
  PaginateResultResponse,
} from '@shop/shared/data-access/models';
import { StringUtil } from '@shop/shared/utilities/string';

@Injectable({ providedIn: 'root' })
export class CategoriesApiService extends BaseApiService {
  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) {
    super();
  }

  getCategories(
    params: PaginateParamsDto
  ): Observable<PaginateResultResponse<Category>> {
    let url = this.appConfig.baseURL + '/categories';
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
          this.process<PaginateResultResponse<Category>>(response, 200)
        )
      )
      .pipe(
        catchError((response) => {
          if (response instanceof HttpResponseBase) {
            try {
              return this.process<PaginateResultResponse<Category>>(response);
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
