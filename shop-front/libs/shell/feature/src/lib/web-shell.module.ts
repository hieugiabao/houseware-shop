import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebLayoutModule } from '@shop/shell/ui/layout';
import { webShellRoutes } from './web-shell.routes';

@NgModule({
  imports: [
    CommonModule,
    WebLayoutModule,
    RouterModule.forRoot(webShellRoutes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
  declarations: [],
})
export class WebShellModule {}
