import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HomeGreetingModule } from '@shop/home/ui/greeting';
import { FeaturedProductsModule } from '@shop/home/ui/featured-products';
import { HomeUiBestSellerModule } from '@shop/home/ui/best-seller';
import { HomeUiShopByCategoryModule } from '@shop/home/ui/shop-by-category';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
    HomeGreetingModule,
    FeaturedProductsModule,
    HomeUiBestSellerModule,
    HomeUiShopByCategoryModule,
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeFeatureModule {}
