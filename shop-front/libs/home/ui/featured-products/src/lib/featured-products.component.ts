import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductsService } from '@shop/home/data-access';
import {
  ApiResponse,
  PaginateResultResponse,
  Product,
} from '@shop/shared/data-access/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'shop-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedProductsComponent implements OnInit {
  productsResponse$!: Observable<ApiResponse<PaginateResultResponse<Product>>>;
  page = 1;
  perPage = 9;

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsResponse$ = this.productsService.getProductsPaginated({
      page: this.page,
      perPage: this.perPage,
    });
  }

  paginate(event: any) {
    this.page = event.page + 1;
    this.perPage = event.rows;
    this.getProducts();
  }

  getNameCategories(categories: any[]): string[] {
    return categories.map((category) => category?.name || '');
  }
}
