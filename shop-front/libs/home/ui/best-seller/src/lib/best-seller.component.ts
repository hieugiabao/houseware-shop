import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductsService } from '@shop/home/data-access';
import {
  ApiResponse,
  PaginateResultResponse,
  Product,
} from '@shop/shared/data-access/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'shop-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BestSellerComponent implements OnInit {
  productsResponse$!: Observable<ApiResponse<PaginateResultResponse<Product>>>;

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsResponse$ = this.productsService.getBestSellerProducts({
      page: 1,
      perPage: 15,
    });
  }

  getNameCategories(categories: any[]): string[] {
    return categories.map((category) => category?.name || '');
  }
}
