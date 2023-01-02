import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@shop/auth/data-access';
import {
  ApiResponse,
  ApiResponseStatus,
  TokenResultResponse,
} from '@shop/shared/data-access/models';
import { ShopValidators } from '@shop/shared/utilities/misc';
import { finalize, map, take, tap, withLatestFrom } from 'rxjs';

@Component({
  selector: 'shop-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;
  public loginResponse: ApiResponse<TokenResultResponse> | undefined =
    undefined;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, ShopValidators.isEmail]],
      password: ['', Validators.required],
      remember: [false],
    });
  }

  submit() {
    const { email, password } = this.form.value;

    this.authService
      .login(email, password)
      .pipe(
        withLatestFrom(
          this.route.queryParamMap.pipe(
            map((route) => route.get('returnUrl') || '/'),
            take(1)
          )
        ),
        finalize(() => {
          this.form.reset({
            email,
            password: '',
          });
          this.form.get('password')?.markAsTouched();
        })
      )
      .pipe(
        take(2),
        tap(([response, returnUrl]) => this.handleNext(response, returnUrl))
      )
      .subscribe({
        error: (err) => {
          console.error(err);
        },
      });
  }

  private handleNext(
    response: ApiResponse<TokenResultResponse>,
    returnUrl: string
  ) {
    this.loginResponse = response;
    if (response.status === ApiResponseStatus.Success) {
      this.router.navigate([returnUrl]);
    }
  }
}
