import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebLayoutModule } from '@shop/shell/ui/layout';
import { webShellRoutes } from './web-shell.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    WebLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(webShellRoutes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
  declarations: [],
})
export class WebShellModule {}
