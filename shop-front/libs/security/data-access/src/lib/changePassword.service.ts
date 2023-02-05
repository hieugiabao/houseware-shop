import { Injectable } from '@angular/core';
import {
  ApiResponse,
  UpdatePasswordParamsDto,
} from '@shop/shared/data-access/models';
import { CustomerAuthApiService } from '@shop/shared/data-access/shop-api';
import { handleApiResponse } from '@shop/shared/utilities/rx';
import { defaultIfEmpty, Observable } from 'rxjs';
@Injectable()
export class ChangePasswordService {
  constructor(
    private readonly customerAuthApiService: CustomerAuthApiService
  ) {}

  updateCustomer(
    params: UpdatePasswordParamsDto
  ): Observable<ApiResponse<unknown>> {
    return handleApiResponse<unknown>(
      this.customerAuthApiService
        .changePassword(params)
        .pipe(defaultIfEmpty(null)),
      null,
      (err) => {
        return (err as any)?.['message'] || 'Something went wrong';
      }
    );
  }
}
