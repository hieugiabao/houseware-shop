import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeGreetingComponent } from './greeting.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, ButtonModule, RippleModule, RouterModule],
  declarations: [HomeGreetingComponent],
  exports: [HomeGreetingComponent],
})
export class HomeGreetingModule {}
