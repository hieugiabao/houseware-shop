import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './main-view.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [MainViewComponent],
  exports: [MainViewComponent],
})
export class MainViewModule {}
