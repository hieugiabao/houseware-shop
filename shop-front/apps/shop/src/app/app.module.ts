import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { authInterceptorProvider } from '@shop/auth/interceptor';
import { getAppConfigProvider } from '@shop/shared/app-config';
import { WebShellModule } from '@shop/shell/feature';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, WebShellModule],
  providers: [getAppConfigProvider(environment), authInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
