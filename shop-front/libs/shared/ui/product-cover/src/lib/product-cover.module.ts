import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCoverComponent } from './product-cover.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ProductCoverComponent],
  exports: [ProductCoverComponent],
})
export class ProductCoverModule {}
