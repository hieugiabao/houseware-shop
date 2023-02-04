import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { MainViewModule } from '@shop/shell/ui/main-view';
import { TopBarModule } from '@shop/shell/ui/top-bar';
import { FooterModule } from '@shop/shell/ui/footer';

@NgModule({
  imports: [
    CommonModule,
    MainViewModule,
    RouterModule,
    TopBarModule,
    FooterModule,
  ],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
})
export class WebLayoutModule {}
