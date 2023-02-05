import { handleApiResponse } from '@shop/shared/utilities/rx';
import { CustomerAuthApiService } from '@shop/shared/data-access/shop-api';
import { Injectable } from '@angular/core';
import {
  ApiResponse,
  UpdateCustomerParamsDto,
} from '@shop/shared/data-access/models';
import { defaultIfEmpty, Observable } from 'rxjs';

@Injectable()
export class UpdateCustomerService {
  constructor(
    private readonly customerAuthApiService: CustomerAuthApiService
  ) {}

  updateCustomer(
    params: UpdateCustomerParamsDto
  ): Observable<ApiResponse<unknown>> {
    return handleApiResponse<unknown>(
      this.customerAuthApiService.updateMe(params).pipe(defaultIfEmpty(null)),
      null,
      (err) => {
        return (err as any)?.['message'] || 'Something went wrong';
      }
    );
  }
}
