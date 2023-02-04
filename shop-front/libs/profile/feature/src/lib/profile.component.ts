import { ShopValidators } from '@shop/shared/utilities/misc';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shop-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public formPersonalDetails!: FormGroup;
  showFormPersonalDetails = false;
  formPassword!: FormGroup;
  showFormPassword = false;
  personalDetails: any;
  constructor(private readonly fb: FormBuilder) {}
  ngOnInit(): void {
    this.formPersonalDetails = this.fb.group({
      name: ['Kai'],
      email: ['kai@kai.com'],
      telephone: ['1234567890'],
    });
    this.formPassword = this.fb.group(
      {
        currentPassword: '',
        password: '',
        passwordConfirmation: '',
      },
      {
        validators: [ShopValidators.checkPasswords],
      }
    );
  }
  toggleFormPersonalDetails() {
    this.showFormPersonalDetails = !this.showFormPersonalDetails;
  }
  toggleFormPassword() {
    this.showFormPassword = !this.showFormPassword;
  }
}
