import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailService } from '@shop/product-detail/data-access';
import {
  ApiResponse,
  Product,
  ProductImage,
} from '@shop/shared/data-access/models';
import { MenuItem } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'shop-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  productResponse$!: Observable<ApiResponse<Product>>;
  breadCrumbItems!: MenuItem[];
  home!: MenuItem;

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  constructor(
    private readonly productDetailService: ProductDetailService,
    private readonly route: ActivatedRoute,
    private readonly cdf: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Women' },
      { label: 'Clothing' },
      { label: 'Shirts and tops' },
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.subscription = this.route.params.subscribe((params) => {
      const productId = params['id'];
      this.productResponse$ = this.productDetailService.getProduct(productId);
      this.cdf.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  convertImages(images: ProductImage[]) {
    return images.map((image) => {
      return {
        previewImageSrc: image.src,
        thumbnailImageSrc: image.src,
      };
    });
  }
}
