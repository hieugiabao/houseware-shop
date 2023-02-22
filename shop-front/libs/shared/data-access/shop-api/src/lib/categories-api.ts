import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AppConfig, APP_CONFIG } from '@shop/shared/app-config';
import {
  Category,
  PaginateParamsDto,
  PaginateResultResponse,
} from '@shop/shared/data-access/models';
import { StringUtil } from '@shop/shared/utilities/string';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api';

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
      .pipe(this.handleResponse<PaginateResultResponse<Category>>(200));
  }

  getCategoryById(id: string): Observable<Category> {
    let url = this.appConfig.baseURL + '/categories/' + id;
    url = url.replace(/[?&]$/, ''); // remove any trailing ? or &

    return this.httpClient
      .request('get', url, {
        observe: 'response',
        responseType: 'blob',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      })
      .pipe(this.handleResponse<Category>(200));
  }

  getChildCategoriesByParentId(id: string): Observable<Category[]> {
    let url = this.appConfig.baseURL + '/categories/' + id + '/children';
    url = url.replace(/[?&]$/, ''); // remove any trailing ? or &

    return this.httpClient
      .request('get', url, {
        observe: 'response',
        responseType: 'blob',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      })
      .pipe(this.handleResponse<Category[]>(200));
  }
}
