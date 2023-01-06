import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductCoverModule } from '@shop/shared/ui/product-cover';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ProductCoverModule,
    RippleModule,
    ButtonModule,
    RouterModule,
  ],
  declarations: [ProductComponent],
  exports: [ProductComponent],
})
export class SharedUiProductModule {}
