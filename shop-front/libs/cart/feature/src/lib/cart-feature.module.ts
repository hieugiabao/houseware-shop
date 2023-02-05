import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart-feature.component';
import { RouterModule } from '@angular/router';
import { CartUiCartItemModule } from '@shop/cart/ui/cart-item';

@NgModule({
  imports: [
    CommonModule,
    CartUiCartItemModule,
    RouterModule.forChild([{ path: '', component: CartComponent }]),
  ],
  declarations: [CartComponent],
})
export class CartFeatureModule {}
