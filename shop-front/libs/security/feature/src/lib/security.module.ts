import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  SecurityLayoutComponent,
  SecurityUiLayoutModule,
} from '@shop/security/ui/layout';
import { LoginComponent, SecurityUiLoginModule } from '@shop/security/ui/login';

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
        ],
      },
    ]),
    SecurityUiLayoutModule,
    SecurityUiLoginModule,
  ],
  exports: [RouterModule],
})
export class SecurityModule {}
