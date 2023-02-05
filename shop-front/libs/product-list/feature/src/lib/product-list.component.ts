import { CategoriesService } from '@shop/shell/data-access';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
  OnChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  PaginateResultResponse,
  Product,
} from '@shop/shared/data-access/models';
import { ProductsService } from '@shop/home/data-access';
import { Category } from '@shop/shared/data-access/models';

@Component({
  selector: 'shop-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit, OnChanges {
  breadCrumbItems!: MenuItem[];
  childCategoryItems!: MenuItem[];
  home!: MenuItem;
  categoryId!: string;
  category!: Category;
  productsResponse$!: Observable<ApiResponse<PaginateResultResponse<Product>>>;
  page = 1;
  perPage = 9;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
    private readonly cdf: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = params['id'];
      this.getCategory();
      this.getProducts();
      this.getChildCategories();
      this.cdf.markForCheck();
    });
    this.breadCrumbItems = [
      { label: 'Women' },
      { label: 'Clothing' },
      { label: 'Shirts and tops' },
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  getProducts() {
    this.productsResponse$ = this.productsService.getProductsByCategory(
      {
        page: this.page,
        perPage: this.perPage,
      },
      this.categoryId
    );
  }

  getCategory() {
    this.categoriesService.getCategoryById(this.categoryId).subscribe((res) => {
      this.category = res.data as Category;
    });
  }

  getChildCategories() {
    this.categoriesService
      .getChildCategoriesByParentId(this.categoryId)
      .subscribe((res) => {
        this.childCategoryItems = res.data?.map((child) => {
          return {
            label: child.name,
            routerLink: `/category/${child['id']}`,
          };
        }) as MenuItem[];
      });
  }

  ngOnChanges() {
    console.log('ngOnChanges');
    this.categoryId = this.route.snapshot.paramMap.get('id') || '';
    this.getProducts();
  }

  pageChange(event: { page: number; perPage: number }) {
    this.page = event.page;
    this.perPage = event.perPage;
    this.getProducts();
  }
}
