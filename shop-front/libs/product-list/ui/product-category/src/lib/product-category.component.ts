import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from '@shop/cart/data-access';
import {
  PaginateResultResponse,
  Product,
} from '@shop/shared/data-access/models';

@Component({
  selector: 'shop-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
})
export class ProductCategoryComponent {
  @Input() products?: PaginateResultResponse<Product> | null;
  @Input() page = 1;
  @Input() perPage = 3;
  @Input() categoryName = '';
  @Output() pageChange = new EventEmitter<{
    page: number;
    perPage: number;
  }>();

  constructor(private readonly cartService: CartService) {}

  paginate(event: any) {
    this.page = event.page + 1;
    this.perPage = event.rows;
    this.pageChange.emit({ page: this.page, perPage: this.perPage });
  }

  addToCart(productId: number) {
    this.cartService.addToCart(productId, 1).subscribe();
  }
}
