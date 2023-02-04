import { CustomerAuthApiService } from '@shop/shared/data-access/shop-api';
import { Injectable } from '@angular/core';
import { handleApiResponse } from '../../../../shared/utilities/rx/src';
import { defaultIfEmpty } from 'rxjs';
@Injectable()
export class LogoutService {
  constructor(
    private readonly customerAuthApiService: CustomerAuthApiService
  ) {}

  logout() {
    return handleApiResponse(
      this.customerAuthApiService
        .logout({
          refreshToken: localStorage.getItem('rtok') || '',
        })
        .pipe(defaultIfEmpty(null)),
      null,
      () => 'Error when logout'
    );
  }
}
