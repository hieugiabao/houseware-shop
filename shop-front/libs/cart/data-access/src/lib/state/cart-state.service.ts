import { Cart } from '@shop/shared/data-access/models';
import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartStateService extends RxState<Cart> {
  cartItems$ = this.select('cartItems');
  count$ = this.cartItems$.pipe(map((items) => items.length));

  constructor() {
    super();
    this.reset();
  }

  reset(): void {
    this.set({
      cartItems: [],
      subTotal: 0,
      tax: 0,
      total: 0,
    });
  }

  setCart(cart: Cart): void {
    this.set(cart);
  }
}
