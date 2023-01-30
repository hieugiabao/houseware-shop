/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponse, HttpResponseBase } from '@angular/common/http';
import { ApiErrorDto, ApiException } from '@shop/shared/data-access/models';
import { StringUtil } from '@shop/shared/utilities/string';
import {
  catchError,
  EMPTY,
  mergeMap,
  Observable,
  of,
  pipe,
  throwError,
} from 'rxjs';

export abstract class BaseApiService {
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  private process<TData>(
    response: HttpResponseBase,
    expectedStatus = 0
  ): Observable<TData> | Observable<never> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    const _headers: any = {};
    if (response.headers)
      for (const key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }

    if (status === expectedStatus) {
      return this.blobToText(responseBlob).pipe(
        mergeMap((responseText: string) => {
          const result =
            responseText === ''
              ? null
              : (StringUtil.convertKeysFromSnakeCaseToCamelCase(
                  JSON.parse(responseText, this.jsonParseReviver)
                ) as TData);
          return result !== null ? of(result) : EMPTY;
        })
      );
    } else if (status === 400) {
      return this.blobToText(responseBlob).pipe(
        mergeMap((_responseText: string) => {
          let result400: any = null;
          result400 =
            _responseText === ''
              ? null
              : (StringUtil.convertKeysFromSnakeCaseToCamelCase(
                  StringUtil.convertKeysFromSnakeCaseToCamelCase(
                    JSON.parse(_responseText, this.jsonParseReviver)
                  )
                ) as ApiErrorDto);
          return this.throwException(
            'Bad request',
            status,
            _responseText,
            _headers,
            result400
          );
        })
      );
    } else if (status === 401) {
      return this.blobToText(responseBlob).pipe(
        mergeMap((_responseText: string) => {
          let result401: any = null;
          result401 =
            _responseText === ''
              ? null
              : (StringUtil.convertKeysFromSnakeCaseToCamelCase(
                  JSON.parse(_responseText, this.jsonParseReviver)
                ) as ApiErrorDto);
          return this.throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 403) {
      return this.blobToText(responseBlob).pipe(
        mergeMap((_responseText: string) => {
          let result403: any = null;
          result403 =
            _responseText === ''
              ? null
              : (StringUtil.convertKeysFromSnakeCaseToCamelCase(
                  JSON.parse(_responseText, this.jsonParseReviver)
                ) as ApiErrorDto);
          return this.throwException(
            'Forbidden',
            status,
            _responseText,
            _headers,
            result403
          );
        })
      );
    } else if (status === 404) {
      return this.blobToText(responseBlob).pipe(
        mergeMap((_responseText: string) => {
          let result404: any = null;
          result404 =
            _responseText === ''
              ? null
              : (StringUtil.convertKeysFromSnakeCaseToCamelCase(
                  JSON.parse(_responseText, this.jsonParseReviver)
                ) as ApiErrorDto);
          return this.throwException(
            'Not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else if (status === 500) {
      return this.blobToText(responseBlob).pipe(
        mergeMap((_responseText: string) => {
          let result500: any = null;
          result500 =
            _responseText === ''
              ? null
              : (StringUtil.convertKeysFromSnakeCaseToCamelCase(
                  JSON.parse(_responseText, this.jsonParseReviver)
                ) as ApiErrorDto);
          return this.throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            result500
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return this.blobToText(responseBlob).pipe(
        mergeMap((_responseText: string) => {
          return this.throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }

    return EMPTY;
  }

  protected blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer) => {
      if (!blob) {
        observer.next('');
        observer.complete();
      } else {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          observer.next(event.target.result);
          observer.complete();
        };
        reader.readAsText(blob);
      }
    });
  }

  private throwException(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result?: any
  ): Observable<any> {
    if (result !== null && result !== undefined)
      return throwError(() => result);
    else
      return throwError(
        () => new ApiException(message, status, response, headers, null)
      );
  }

  protected handleResponse<T>(statusCode: number) {
    return pipe(
      mergeMap((response: HttpResponse<Blob>) =>
        this.process<T>(response, statusCode)
      ),
      catchError((response) => {
        if (response instanceof HttpResponseBase) {
          try {
            return this.process<T>(response);
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
