import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { getAppConfigProvider } from '@shop/shared/app-config';
import { WebShellModule } from '@shop/shell/feature';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, WebShellModule],
  providers: [getAppConfigProvider(environment)],
  bootstrap: [AppComponent],
})
export class AppModule {}
