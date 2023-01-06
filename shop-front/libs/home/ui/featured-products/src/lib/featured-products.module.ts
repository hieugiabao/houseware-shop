import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedProductsComponent } from './featured-products.component';
import { PaginatorModule } from 'primeng/paginator';
import { ProductsService } from '@shop/home/data-access';
import { DataViewModule } from 'primeng/dataview';
import { SharedUiProductModule } from '@shop/shared/ui/product';

@NgModule({
  imports: [
    CommonModule,
    PaginatorModule,
    DataViewModule,
    SharedUiProductModule,
  ],
  declarations: [FeaturedProductsComponent],
  exports: [FeaturedProductsComponent],
  providers: [ProductsService],
})
export class FeaturedProductsModule {}
