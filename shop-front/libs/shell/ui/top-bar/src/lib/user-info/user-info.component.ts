import { LogoutService } from '@shop/shell/data-access';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthStateService } from '@shop/auth/data-access';
import { CustomerInfomation } from '@shop/shared/data-access/models';
import { CartStateService } from '@shop/cart/data-access';
import { Router } from '@angular/router';

@Component({
  selector: 'shop-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent implements OnInit {
  public currentUser$!: Observable<CustomerInfomation | null>;
  public haveToken = false;
  items!: MenuItem[];

  totalItems$!: Observable<number>;
  constructor(
    private readonly authStateService: AuthStateService,
    private readonly cartStateService: CartStateService,
    private readonly logoutService: LogoutService,
    private readonly router: Router
  ) {
    this.haveToken = !!localStorage.getItem('rtok');
  }

  ngOnInit(): void {
    this.items = [
      {
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-user',
            command: () => {
              this.router.navigate(['/profile']);
            },
          },
          {
            label: 'Orders',
            icon: 'pi pi-shopping-cart',
            command: () => {
              this.router.navigate(['/orders']);
            },
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
              this.logoutService.logout().subscribe({
                next: () => {
                  localStorage.removeItem('rtok');
                  window.location.reload();
                },
              });
            },
          },
        ],
      },
    ];

    this.currentUser$ = this.authStateService.currentUser$;
    this.totalItems$ = this.cartStateService.count$;
  }
}
