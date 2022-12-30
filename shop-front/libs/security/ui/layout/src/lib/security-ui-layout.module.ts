import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityLayoutComponent } from './security-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [SecurityLayoutComponent],
  exports: [SecurityLayoutComponent],
})
export class SecurityUiLayoutModule {}
