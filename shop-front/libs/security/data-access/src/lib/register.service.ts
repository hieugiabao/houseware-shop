import { Injectable } from '@angular/core';
import {
  ApiResponse,
  RegisterParamsDto,
} from '@shop/shared/data-access/models';
import { CustomerAuthApiService } from '@shop/shared/data-access/shop-api';
import { handleApiResponse } from '@shop/shared/utilities/rx';
import { defaultIfEmpty, Observable } from 'rxjs';
@Injectable()
export class RegisterService {
  constructor(
    private readonly customerAuthApiService: CustomerAuthApiService
  ) {}
  public register(params: RegisterParamsDto): Observable<ApiResponse<unknown>> {
    return handleApiResponse<unknown>(
      this.customerAuthApiService.register(params).pipe(defaultIfEmpty(null)),
      null,
      (err) => {
        return (err as any)?.['message'] || 'Something went wrong';
      }
    );
  }
}
