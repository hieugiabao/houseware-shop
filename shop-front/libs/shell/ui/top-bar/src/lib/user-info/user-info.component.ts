import { LogoutService } from '@shop/shell/data-access';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthStateService } from '@shop/auth/data-access';
import { CustomerInfomation } from '@shop/shared/data-access/models';
import { CartStateService } from '@shop/cart/data-access';

@Component({
  selector: 'shop-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent implements OnInit {
  public currentUser$!: Observable<CustomerInfomation | null>;
  public haveToken$!: Observable<boolean>;
  items!: MenuItem[];

  totalItems$!: Observable<number>;
  constructor(
    private readonly authStateService: AuthStateService,
    private readonly cartStateService: CartStateService,
    private readonly logoutService: LogoutService
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-user',
            command: () => {},
          },
          {
            label: 'Orders',
            icon: 'pi pi-shopping-cart',
            command: () => {},
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
              this.logoutService.logout().subscribe({
                next: () => {
                  localStorage.removeItem('rtok');
                  // clear all cookie
                  document.cookie.split(';').forEach(function (c) {
                    document.cookie = c
                      .replace(/^ +/, '')
                      .replace(
                        /=.*/,
                        '=;expires=' + new Date().toUTCString() + ';path=/'
                      );
                  });
                  // window.location.reload();
                },
              });
            },
          },
        ],
      },
    ];

    this.currentUser$ = this.authStateService.currentUser$;
    this.haveToken$ = new Observable<boolean>((subscriber) => {
      if (localStorage.getItem('rtok')) {
        subscriber.next(true);
      } else {
        subscriber.next(false);
      }
    });
    this.totalItems$ = this.cartStateService.count$;
  }
}
