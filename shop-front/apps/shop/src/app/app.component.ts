import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shop/auth/data-access';
import { CartService } from '@shop/cart/data-access';

@Component({
  selector: 'shop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'shop';

  constructor(
    private readonly authService: AuthService,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    this.authService.refreshToken().subscribe({
      complete: () => {
        this.cartService.init();
      },
    });
  }
}
