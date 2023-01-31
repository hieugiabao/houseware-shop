import {
  ApiResponse,
  ApiResponseStatus,
} from '@shop/shared/data-access/models';
import { RegisterService } from '@shop/security/data-access';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopValidators } from '@shop/shared/utilities/misc';
import { EMPTY, finalize, Observable, tap } from 'rxjs';

@Component({
  selector: 'shop-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;
  public registerResponse$:
    | Observable<ApiResponse<unknown>>
    | Observable<never> = EMPTY;
  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, ShopValidators.isEmail]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        passwordConfirmation: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            // Validators.pattern(this.form.get('password')?.value),
          ],
        ],
      },
      { validators: ShopValidators.checkPasswords }
    );
  }

  submit() {
    console.log('this.form.value', this.form.value);
    const { name, email, password, passwordConfirmation } = this.form.value;
    this.registerResponse$ = this.registerService
      .register({
        name,
        email,
        password,
        passwordConfirmation,
      })
      .pipe(
        tap((res) => {
          console.log('res', res);
          if (res.status === ApiResponseStatus.Success) {
            console.log('------------success', res);
            this.router.navigate(['/login']);
          }
        }),
        finalize(() => {
          this.form.reset({
            name,
            email,
            password: '',
            passwordConfirmation: '',
          });
        })
      );
    this.registerResponse$.subscribe({
      next: (res) => console.log('res', res),
      error: (err) => console.log('err', err),
      complete: () => console.log('complete'),
    });
  }
}
