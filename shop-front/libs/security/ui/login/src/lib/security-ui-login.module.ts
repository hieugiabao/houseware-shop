import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class SecurityUiLoginModule {}
