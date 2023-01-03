import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopLogoComponent } from './shop-logo.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ShopLogoComponent],
  exports: [ShopLogoComponent],
})
export class SharedUiLogoModule {}
