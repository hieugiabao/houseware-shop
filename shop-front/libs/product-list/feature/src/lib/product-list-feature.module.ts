import { PanelMenuModule } from 'primeng/panelmenu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { RouterModule } from '@angular/router';
import { ProductListUiProductCategoryModule } from '@shop/product-list/ui/product-category';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  imports: [
    CommonModule,
    BreadcrumbModule,
    PanelMenuModule,
    ProductListUiProductCategoryModule,
    ProgressSpinnerModule,
    RouterModule.forChild([{ path: ':id', component: ProductListComponent }]),
  ],
  declarations: [ProductListComponent],
  exports: [RouterModule],
})
export class ProductListFeatureModule {}
