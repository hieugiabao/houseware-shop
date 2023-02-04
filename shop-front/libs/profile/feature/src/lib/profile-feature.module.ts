import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PasswordModule } from 'primeng/password';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    StyleClassModule,
    PasswordModule,
    RouterModule.forChild([{ path: '', component: ProfileComponent }]),
  ],
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
})
export class ProfileFeatureModule {}
