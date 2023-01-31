import { Observable } from 'rxjs';
import { handleApiResponse } from '@shop/shared/utilities/rx';
import { CustomerAuthApiService } from '@shop/shared/data-access/shop-api';
import { Injectable } from '@angular/core';
import {
  ApiResponse,
  RegisterParamsDto,
} from '@shop/shared/data-access/models';
@Injectable()
export class RegisterService {
  constructor(
    private readonly customerAuthApiService: CustomerAuthApiService
  ) {}
  public register(params: RegisterParamsDto): Observable<ApiResponse<unknown>> {
    return handleApiResponse<unknown>(
      this.customerAuthApiService.register(params),
      null,
      () => {
        return 'Register failed';
      }
    );
  }
}
