import { SharedUiLogoModule } from '@shop/shared/ui/logo';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RouterModule } from '@angular/router';

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
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class SecurityUiLoginModule {}
