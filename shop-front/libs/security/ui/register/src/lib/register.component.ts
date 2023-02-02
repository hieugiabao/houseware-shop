import {
  ApiResponse,
  ApiResponseStatus,
} from '@shop/shared/data-access/models';
import { RegisterService } from '@shop/security/data-access';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopValidators } from '@shop/shared/utilities/misc';
import { finalize, tap } from 'rxjs';

@Component({
  selector: 'shop-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;
  public registerResponse: ApiResponse<null> | null = null;
  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly registerService: RegisterService,
    private readonly cdf: ChangeDetectorRef
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
    const { name, email, password, passwordConfirmation } = this.form.value;
    this.registerService
      .register({
        name,
        email,
        password,
        passwordConfirmation,
      })
      .pipe(
        tap((res) => {
          if (res.status === ApiResponseStatus.Success) {
            this.router.navigate(['/login']);
          }
          this.registerResponse = res as ApiResponse<null>;
          this.cdf.detectChanges();
        }),
        finalize(() => {
          this.form.reset({
            name,
            email,
            password: '',
            passwordConfirmation: '',
          });

          this.form.get('password')?.markAsUntouched();
          this.form.get('passwordConfirmation')?.markAsUntouched();
        })
      )
      .subscribe();
  }
}
