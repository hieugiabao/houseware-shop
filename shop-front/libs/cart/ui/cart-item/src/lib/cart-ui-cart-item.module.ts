import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from './cart-item.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
    InputNumberModule,
    FormsModule,
    ButtonModule,
    ConfirmPopupModule,
  ],
  declarations: [CartItemComponent],
  exports: [CartItemComponent],
  providers: [ConfirmationService],
})
export class CartUiCartItemModule {}
