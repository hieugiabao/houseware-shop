import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  SecurityLayoutComponent,
  SecurityUiLayoutModule,
} from '@shop/security/ui/layout';
import { LoginComponent, SecurityUiLoginModule } from '@shop/security/ui/login';
import {
  RegisterComponent,
  SecurityUiRegisterModule,
} from '@shop/security/ui/register';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SecurityLayoutComponent,
        children: [
          {
            path: 'login',
            component: LoginComponent,
          },
          {
            path: 'register',
            component: RegisterComponent,
          },
        ],
      },
    ]),
    SecurityUiLayoutModule,
    SecurityUiLoginModule,
    SecurityUiRegisterModule,
  ],
  exports: [RouterModule],
})
export class SecurityModule {}
