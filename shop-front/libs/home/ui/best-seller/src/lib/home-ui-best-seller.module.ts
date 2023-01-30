import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '@shop/home/data-access';
import { BestSellerComponent } from './best-seller.component';
import { CarouselModule } from 'primeng/carousel';
import { SharedUiProductModule } from '@shop/shared/ui/product';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    SharedUiProductModule,
    SkeletonModule,
  ],
  declarations: [BestSellerComponent],
  exports: [BestSellerComponent],
  providers: [ProductsService],
})
export class HomeUiBestSellerModule {}
