import { PaginatorModule } from 'primeng/paginator';
import { SharedUiProductModule } from '@shop/shared/ui/product';
import { DataViewModule } from 'primeng/dataview';
import { ProductCategoryComponent } from './product-category.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    DataViewModule,
    SharedUiProductModule,
    PaginatorModule,
  ],
  declarations: [ProductCategoryComponent],
  exports: [ProductCategoryComponent],
})
export class ProductListUiProductCategoryModule {}
