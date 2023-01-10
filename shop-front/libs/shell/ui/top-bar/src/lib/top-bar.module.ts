import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { TopBarComponent } from './top-bar.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedUiLogoModule } from '@shop/shared/ui/logo';
import { OptionComponent } from './not-auth-option/option.component';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    BrowserAnimationsModule,
    InputTextModule,
    SharedUiLogoModule,
    RouterModule,
    RippleModule,
  ],
  declarations: [
    TopBarComponent,
    UserInfoComponent,
    OptionComponent,
    SearchComponent,
  ],
  exports: [TopBarComponent],
})
export class TopBarModule {}
