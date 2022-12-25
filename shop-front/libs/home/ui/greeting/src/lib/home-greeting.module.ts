import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeGreetingComponent } from './greeting.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HomeGreetingComponent],
  exports: [HomeGreetingComponent],
})
export class HomeGreetingModule {}
