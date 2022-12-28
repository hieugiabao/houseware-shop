import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { MainViewModule } from '@shop/shell/ui/main-view';
import { TopBarModule } from '@shop/shell/ui/top-bar';

@NgModule({
  imports: [CommonModule, MainViewModule, RouterModule, TopBarModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
})
export class WebLayoutModule {}
