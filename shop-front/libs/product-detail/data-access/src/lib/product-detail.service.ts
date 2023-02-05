import { Injectable } from '@angular/core';
import {
  ApiResponse,
  Product,
  ProductImage,
} from '@shop/shared/data-access/models';
import { ProductsApiService } from '@shop/shared/data-access/shop-api';
import { handleApiResponse } from '@shop/shared/utilities/rx';
import { Observable } from 'rxjs';

@Injectable()
export class ProductDetailService {
  constructor(private readonly productsApiService: ProductsApiService) {}

  getProduct(id: number): Observable<ApiResponse<Product>> {
    return handleApiResponse(
      this.productsApiService.getProductAttributeDetail(id),
      null
    );
  }

  getImageList(id: number): Observable<ApiResponse<ProductImage[]>> {
    return handleApiResponse(this.productsApiService.getImageList(id), null);
  }
}
