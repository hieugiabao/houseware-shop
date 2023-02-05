import { ChangePasswordService } from './../../../../security/data-access/src/lib/changePassword.service';
import { UpdateCustomerService } from './../../../../security/data-access/src/lib/updateCustomer.service';
import { AuthStateService } from '@shop/auth/data-access';
import { Address, CustomerInfomation } from '@shop/shared/data-access/models';
import { ShopValidators } from '@shop/shared/utilities/misc';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'shop-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public currentUser$!: Observable<CustomerInfomation | null>;
  userData!: CustomerInfomation | null;
  address!: Address | null;

  formPersonalDetails!: FormGroup;
  formPassword!: FormGroup;
  formAddress!: FormGroup;

  showFormPersonalDetails = false;
  showFormPassword = false;
  showFormAddress = false;
  constructor(
    private readonly fb: FormBuilder,
    private readonly authStateService: AuthStateService,
    private readonly updateCustomerService: UpdateCustomerService,
    private readonly changePasswordService: ChangePasswordService,
    private cdf: ChangeDetectorRef,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.formPersonalDetails = this.fb.group({
      name: [''],
      email: ['', [Validators.required, ShopValidators.isEmail]],
    });
    this.currentUser$ = this.authStateService.currentUser$;
    this.currentUser$.subscribe((user) => {
      this.userData = user;
      this.formPersonalDetails.patchValue({
        name: user?.name,
        email: user?.email,
      });
      this.cdf.markForCheck();
    });
    this.formPassword = this.fb.group(
      {
        currentPassword: '',
        password: ['', [Validators.required, Validators.minLength(8)]],
        passwordConfirmation: '',
      },
      {
        validators: [ShopValidators.checkPasswords],
      }
    );
  }

  submitFormPersonalDetails() {
    if (this.formPersonalDetails.valid) {
      console.log(this.formPersonalDetails.value);
      let sendData;
      if (this.formPersonalDetails.get('email')?.value !== this.userData?.email)
        sendData = { email: this.formPersonalDetails.get('email')?.value };

      this.updateCustomerService
        .updateCustomer({
          name: this.formPersonalDetails.get('name')?.value,
          email:
            this.formPersonalDetails.get('email')?.value !==
            this.userData?.email
              ? this.formPersonalDetails.get('email')?.value
              : undefined,
        })
        .pipe(
          tap((res) => {
            console.log(res);
            if (res.status === 'success') {
              this.toggleFormPersonalDetails();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Change personal details successfully',
              });
              this.userData = this.formPersonalDetails.value;
              this.formPersonalDetails.reset({
                name: this.userData?.name,
                email: this.userData?.email,
              });
            } else if (res.status === 'failure') {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: res.error as string,
              });
            }
          })
        )
        .subscribe();
    }
  }

  submitFormPassword() {
    if (this.formPassword.valid) {
      this.changePasswordService
        .updateCustomer(this.formPassword.value)
        .pipe(
          tap((res) => {
            if (res.status === 'success') {
              this.toggleFormPassword();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Change password successfully',
              });
              this.formPassword.reset();
            } else if (res.status === 'failure') {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: res.error as string,
              });
            }
          })
        )
        .subscribe();
    }
  }
  toggleFormPersonalDetails() {
    this.showFormPersonalDetails = !this.showFormPersonalDetails;
  }
  toggleFormPassword() {
    this.showFormPassword = !this.showFormPassword;
  }
  toggleFormAddress() {
    this.showFormAddress = !this.showFormAddress;
  }
}
