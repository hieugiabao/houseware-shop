import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, AuthStateService } from '@shop/auth/data-access';
import { CartService } from '@shop/cart/data-access';
import {
  ApiResponse,
  ApiResponseStatus,
  TokenResultResponse,
} from '@shop/shared/data-access/models';
import { ShopValidators } from '@shop/shared/utilities/misc';
import { finalize, map, take, withLatestFrom } from 'rxjs';

@Component({
  selector: 'shop-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;
  public loginResponse: ApiResponse<TokenResultResponse> | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly authStateService: AuthStateService,
    private readonly cartService: CartService,
    private readonly cdf: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // check if user is already logged in
    this.authStateService.isAuthorized$.subscribe({
      next: (isAuthorized) => {
        if (isAuthorized) {
          this.router.navigate(['/']);
        }
      },
    });

    this.form = this.fb.group({
      email: ['', [Validators.required, ShopValidators.isEmail]],
      password: ['', Validators.required],
      remember: [''],
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
          this.form.get('password')?.markAsUntouched();
        })
      )
      .pipe(
        map(([response, returnURL]) => {
          if (response.status === ApiResponseStatus.Success) {
            this.cartService.autoAddItemWhenLoggedIn();
            this.cartService.init();
            this.router.navigate([returnURL]);
          }
          return response;
        })
      )
      .subscribe({
        next: (response) => {
          this.loginResponse = response;
          this.cdf.markForCheck();
        },
      });
  }
}
