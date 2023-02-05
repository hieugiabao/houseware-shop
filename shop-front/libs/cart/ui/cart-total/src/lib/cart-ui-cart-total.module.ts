import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartTotalComponent } from './cart-total.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, ButtonModule, RouterModule],
  declarations: [CartTotalComponent],
  exports: [CartTotalComponent],
})
export class CartUiCartTotalModule {}
