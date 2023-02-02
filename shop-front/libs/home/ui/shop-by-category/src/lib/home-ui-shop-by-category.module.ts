import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopByCategoryComponent } from './shop-by-category.component';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, ButtonModule, SkeletonModule, RouterModule],
  declarations: [ShopByCategoryComponent],
  exports: [ShopByCategoryComponent],
})
export class HomeUiShopByCategoryModule {}
