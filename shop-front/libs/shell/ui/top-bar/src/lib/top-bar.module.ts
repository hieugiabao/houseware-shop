import { LogoutService } from '@shop/shell/data-access';
import { SkeletonModule } from 'primeng/skeleton';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { TopBarComponent } from './top-bar.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedUiLogoModule } from '@shop/shared/ui/logo';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { SearchComponent } from './search/search.component';
import { ShellUiListCategoryModule } from '@shop/shell/ui/list-category';
import { MenuModule } from 'primeng/menu';
@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    BrowserAnimationsModule,
    InputTextModule,
    SharedUiLogoModule,
    RouterModule,
    RippleModule,
    ShellUiListCategoryModule,
    SkeletonModule,
    MenuModule,
  ],
  declarations: [TopBarComponent, UserInfoComponent, SearchComponent],
  providers: [LogoutService],
  exports: [TopBarComponent],
})
export class TopBarModule {}
