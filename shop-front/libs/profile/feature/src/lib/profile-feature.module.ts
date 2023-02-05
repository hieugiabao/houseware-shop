import { ProfileUiAddressModule } from '@shop/profile/ui/address';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import {
  UpdateCustomerService,
  ChangePasswordService,
  AddressService,
} from '@shop/security/data-access';
import { MessageService } from 'primeng/api';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    StyleClassModule,
    PasswordModule,
    ToastModule,
    DropdownModule,
    ProfileUiAddressModule,
    RouterModule.forChild([{ path: '', component: ProfileComponent }]),
  ],
  declarations: [ProfileComponent],
  providers: [
    UpdateCustomerService,
    MessageService,
    ChangePasswordService,
    AddressService,
  ],
  exports: [ProfileComponent],
})
export class ProfileFeatureModule {}
