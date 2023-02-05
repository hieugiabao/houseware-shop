import { Injectable } from '@angular/core';
import {
  ApiResponse,
  ApiResponseStatus,
  Cart,
} from '@shop/shared/data-access/models';
import { CartApiService } from '@shop/shared/data-access/shop-api';
import { handleApiResponse } from '@shop/shared/utilities/rx';
import { Observable, tap } from 'rxjs';
import { CartStateService } from '../state/cart-state.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(
    private readonly cartStateService: CartStateService,
    private readonly cartApiService: CartApiService
  ) {}

  init(): void {
    this.getCart().subscribe((res) => {
      if (res.status === ApiResponseStatus.Success)
        this.cartStateService.setCart(res.data as Cart);
    });
  }

  getCart(): Observable<ApiResponse<Cart>> {
    return handleApiResponse(this.cartApiService.getCart(), null, (err) => err);
  }

  addToCart(
    productId: number,
    quantity: number
  ): Observable<ApiResponse<Cart>> {
    return handleApiResponse(
      this.cartApiService.addToCart({ product: productId, quantity }).pipe(
        tap((cart) => {
          this.cartStateService.setCart(cart);
        })
      ),
      null,
      (err) => err
    );
  }

  updateCartItem(
    rowId: string,
    quantity: number
  ): Observable<ApiResponse<Cart>> {
    return handleApiResponse(
      this.cartApiService.updateCartItem(rowId, quantity).pipe(
        tap((cart) => {
          this.cartStateService.setCart(cart);
        })
      ),
      null,
      (err) => err
    );
  }

  removeCartItem(rowId: string): Observable<ApiResponse<Cart>> {
    return handleApiResponse(
      this.cartApiService.removeCartItem(rowId).pipe(
        tap((cart) => {
          this.cartStateService.setCart(cart);
        })
      ),
      null,
      (err) => err
    );
  }

  autoAddItemWhenLoggedIn(): void {
    const cartItems = this.cartStateService.get('cartItems');

    for (const item of cartItems) {
      this.addToCart(item.id, item.qty).subscribe();
    }
  }
}
