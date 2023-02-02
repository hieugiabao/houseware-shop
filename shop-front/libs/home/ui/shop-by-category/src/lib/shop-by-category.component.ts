import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  ApiResponse,
  Category,
  PaginateResultResponse,
} from '@shop/shared/data-access/models';
import { CategoriesService } from '@shop/shell/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'shop-by-category',
  templateUrl: './shop-by-category.component.html',
  styleUrls: ['./shop-by-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopByCategoryComponent implements OnInit {
  categoriesResponse$!: Observable<
    ApiResponse<PaginateResultResponse<Category>>
  >;

  constructor(private readonly categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesResponse$ = this.categoriesService.getCategoriesPaginated({
      page: 1,
      perPage: 3,
    });
  }
}
