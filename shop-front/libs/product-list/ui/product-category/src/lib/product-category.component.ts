import { CategoriesService } from '@shop/shell/data-access';
import { ProductsService } from '@shop/home/data-access';
import {
  ApiResponse,
  PaginateResultResponse,
  Product,
} from '@shop/shared/data-access/models';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Output } from '@angular/core';

@Component({
  selector: 'shop-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
})
export class ProductCategoryComponent {
  @Input() products?: PaginateResultResponse<Product> | null;
  @Input() page = 1;
  @Input() perPage = 9;
  @Input() categoryName: string = '';
  @Output() pageChange = new EventEmitter<{
    page: number;
    perPage: number;
  }>();

  paginate(event: any) {
    this.page = event.page + 1;
    this.perPage = event.rows;
    this.pageChange.emit({ page: this.page, perPage: this.perPage });
  }
}
