import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  ApiResponse,
  Category,
  PaginateResultResponse,
} from '@shop/shared/data-access/models';
import { CategoriesService } from '@shop/shell/data-access';

@Component({
  selector: 'shop-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss'],
})
export class ListCategoryComponent implements OnInit {
  response$!: Observable<ApiResponse<PaginateResultResponse<Category>>>;

  constructor(private readonly categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.response$ = this.categoriesService.getCategoriesPaginated({
      page: 1,
      perPage: 10,
    });
  }
}
