import { AbstractControl, ValidationErrors } from '@angular/forms';

const EMAIL_REGEX_WITH_DOMAIN =
  /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

export class ShopValidators {
  static isEmail(control: AbstractControl): ValidationErrors | null {
    if (control?.value === null) {
      return null;
    }
    if (control.value === '') return null;

    return EMAIL_REGEX_WITH_DOMAIN.test(control.value)
      ? null
      : { isEmail: true };
  }
  static checkPasswords(group: AbstractControl): ValidationErrors | null {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('passwordConfirmation')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }
}
