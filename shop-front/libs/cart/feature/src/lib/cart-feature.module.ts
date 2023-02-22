import { CartUiCartTotalModule } from '@shop/cart/ui/cart-total';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart-feature.component';
import { RouterModule } from '@angular/router';
import { CartUiCartItemModule } from '@shop/cart/ui/cart-item';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    CartUiCartItemModule,
    CartUiCartTotalModule,
    ButtonModule,
    RouterModule,
    RouterModule.forChild([{ path: '', component: CartComponent }]),
  ],
  declarations: [CartComponent],
})
export class CartFeatureModule {}
