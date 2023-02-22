import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RegisterService } from '@shop/security/data-access';
import { SharedUiLogoModule } from '@shop/shared/ui/logo';
import { PasswordModule } from 'primeng/password';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    SharedUiLogoModule,
    RouterModule,
    PasswordModule,
  ],
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
  providers: [RegisterService],
})
export class SecurityUiRegisterModule {}
