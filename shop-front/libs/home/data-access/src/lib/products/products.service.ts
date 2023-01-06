import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  ApiResponse,
  PaginateParamsDto,
  PaginateResultResponse,
  Product,
} from '@shop/shared/data-access/models';
import { ProductsApiService } from '@shop/shared/data-access/shop-api';
import { handleApiResponse } from '@shop/shared/utilities/rx';

@Injectable()
export class ProductsService {
  constructor(private readonly productsApiService: ProductsApiService) {}

  getProductsPaginated(
    params: PaginateParamsDto
  ): Observable<ApiResponse<PaginateResultResponse<Product>>> {
    return handleApiResponse(
      this.productsApiService.getProducts(params),
      null,
      () => 'Error when getting products'
    );
  }
}
