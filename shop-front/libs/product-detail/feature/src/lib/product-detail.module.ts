import { ProductDetailUiMainModule } from '@shop/product-detail/ui/main';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ProductDetailComponent } from './product-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
@NgModule({
  imports: [
    CommonModule,
    BreadcrumbModule,
    GalleriaModule,
    ProductDetailUiMainModule,
    RouterModule.forChild([{ path: '', component: ProductDetailComponent }]),
  ],
  declarations: [ProductDetailComponent],
})
export class ProductDetailFeatureModule {}
