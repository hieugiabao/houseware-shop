import { ProductDetailUiMainModule } from '@shop/product-detail/ui/main';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ProductDetailComponent } from './product-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { ProductDetailService } from '@shop/product-detail/data-access';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
@NgModule({
  imports: [
    CommonModule,
    BreadcrumbModule,
    GalleriaModule,
    ProductDetailUiMainModule,
    ButtonModule,
    SkeletonModule,
    RouterModule.forChild([{ path: ':id', component: ProductDetailComponent }]),
  ],
  declarations: [ProductDetailComponent],
  providers: [ProductDetailService],
})
export class ProductDetailFeatureModule {}
