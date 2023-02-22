import { Injectable } from '@angular/core';
import {
  ApiResponse,
  Category,
  PaginateParamsDto,
  PaginateResultResponse,
} from '@shop/shared/data-access/models';
import { CategoriesApiService } from '@shop/shared/data-access/shop-api';
import { handleApiResponse } from '@shop/shared/utilities/rx';
import { Observable } from 'rxjs';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesApiService: CategoriesApiService) {}

  getCategoriesPaginated(
    params: PaginateParamsDto
  ): Observable<ApiResponse<PaginateResultResponse<Category>>> {
    return handleApiResponse(
      this.categoriesApiService.getCategories(params),
      null,
      () => 'Error when loading categories'
    );
  }

  getCategoryById(categoryId: string): Observable<ApiResponse<Category>> {
    return handleApiResponse(
      this.categoriesApiService.getCategoryById(categoryId),
      null,
      () => 'Error when loading category'
    );
  }

  getChildCategoriesByParentId(
    id: string
  ): Observable<ApiResponse<Category[]>> {
    return handleApiResponse(
      this.categoriesApiService.getChildCategoriesByParentId(id),
      null,
      () => 'Error when loading child categories'
    );
  }
}
