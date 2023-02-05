import { CategoriesService } from '@shop/shell/data-access';
import { PaginatorModule } from 'primeng/paginator';
import { SharedUiProductModule } from '@shop/shared/ui/product';
import { DataViewModule } from 'primeng/dataview';
import { ProductCategoryComponent } from './product-category.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '@shop/home/data-access';

@NgModule({
  imports: [
    CommonModule,
    DataViewModule,
    SharedUiProductModule,
    PaginatorModule,
  ],
  declarations: [ProductCategoryComponent],
  providers: [ProductsService, CategoriesService],
  exports: [ProductCategoryComponent],
})
export class ProductListUiProductCategoryModule {}
