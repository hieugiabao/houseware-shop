import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HomeGreetingModule } from '@shop/home/ui/greeting';
import { FeaturedProductsModule } from '@shop/home/ui/featured-products';

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
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeFeatureModule {}
