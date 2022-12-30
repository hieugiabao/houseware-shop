import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { TopBarComponent } from './top-bar.component';
import { LogoComponent } from './logo/logo.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    BrowserAnimationsModule,
    InputTextModule,
  ],
  declarations: [TopBarComponent, LogoComponent, UserInfoComponent],
  exports: [TopBarComponent],
})
export class TopBarModule {}