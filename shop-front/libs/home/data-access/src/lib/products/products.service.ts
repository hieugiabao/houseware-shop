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

  getBestSellerProducts(
    params: PaginateParamsDto
  ): Observable<ApiResponse<PaginateResultResponse<Product>>> {
    return handleApiResponse(
      this.productsApiService.getBestSellerProducts(params),
      null,
      () => 'Error when getting best seller products'
    );
  }

  getProductsByCategory(
    params: PaginateParamsDto,
    categoryId: string
  ): Observable<ApiResponse<PaginateResultResponse<Product>>> {
    return handleApiResponse(
      this.productsApiService.getProductsByCategory(params, categoryId),
      null,
      () => 'Error when getting products by category'
    );
  }
}
