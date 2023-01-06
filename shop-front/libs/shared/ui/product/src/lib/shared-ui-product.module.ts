import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductCoverModule } from '@shop/shared/ui/product-cover';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  imports: [CommonModule, ProductCoverModule, RippleModule],
  declarations: [ProductComponent],
  exports: [ProductComponent],
})
export class SharedUiProductModule {}
