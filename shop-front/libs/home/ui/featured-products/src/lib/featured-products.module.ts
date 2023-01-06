import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedProductsComponent } from './featured-products.component';
import { PaginatorModule } from 'primeng/paginator';
import { ProductsService } from '@shop/home/data-access';

@NgModule({
  imports: [CommonModule, PaginatorModule],
  declarations: [FeaturedProductsComponent],
  exports: [FeaturedProductsComponent],
  providers: [ProductsService],
})
export class FeaturedProductsModule {}
