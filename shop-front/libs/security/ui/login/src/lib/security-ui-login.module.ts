import { SharedUiLogoModule } from '@shop/shared/ui/logo';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    RouterModule,
    SharedUiLogoModule,
    PasswordModule,
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class SecurityUiLoginModule {}
