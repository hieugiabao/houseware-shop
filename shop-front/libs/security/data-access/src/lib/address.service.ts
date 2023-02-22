import { AddressApiService } from '@shop/shared/data-access/shop-api';
import { handleApiResponse } from '@shop/shared/utilities/rx';
import { CustomerAuthApiService } from '@shop/shared/data-access/shop-api';
import { Injectable } from '@angular/core';
import {
  Address,
  ApiResponse,
  UpdateCustomerParamsDto,
} from '@shop/shared/data-access/models';
import { defaultIfEmpty, Observable } from 'rxjs';

@Injectable()
export class AddressService {
  constructor(private readonly addressApiService: AddressApiService) {}

  getAddress(): Observable<ApiResponse<unknown>> {
    return handleApiResponse<unknown>(
      this.addressApiService.getAddresses().pipe(defaultIfEmpty(null)),
      null,
      (err) => {
        return (err as any)?.['message'] || 'Something went wrong';
      }
    );
  }

  updateAddress(params: Address): Observable<ApiResponse<unknown>> {
    return handleApiResponse<unknown>(
      this.addressApiService.updateAddress(params).pipe(defaultIfEmpty(null)),
      null,
      (err) => {
        return (err as any)?.['message'] || 'Something went wrong';
      }
    );
  }
}
