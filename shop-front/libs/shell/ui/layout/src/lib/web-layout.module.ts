import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { MainViewModule } from '@shop/shell/ui/main-view';

@NgModule({
  imports: [CommonModule, MainViewModule, RouterModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
})
export class WebLayoutModule {}
