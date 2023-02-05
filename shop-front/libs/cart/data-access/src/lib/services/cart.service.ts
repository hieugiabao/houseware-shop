import { Injectable } from '@angular/core';
import {
  ApiResponse,
  ApiResponseStatus,
  Cart,
  CartItem,
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
  ): Observable<ApiResponse<CartItem>> {
    return handleApiResponse(
      this.cartApiService.addToCart({ product: productId, quantity }).pipe(
        tap((item) => {
          if (item) {
            const cart = this.cartStateService.get();
            cart.cartItems.push(item);
            this.cartStateService.setCart({
              ...cart,
              cartItems: cart.cartItems,
            });
          }
        })
      ),
      null,
      (err) => err
    );
  }

  updateCartItem(
    rowId: string,
    quantity: number
  ): Observable<ApiResponse<CartItem>> {
    return handleApiResponse(
      this.cartApiService.updateCartItem(rowId, quantity).pipe(
        tap((item) => {
          if (item) {
            const cartItems = this.cartStateService.get('cartItems');
            const index = cartItems.findIndex((i) => i.rowId === rowId);
            cartItems[index] = item;
            this.cartStateService.set({
              cartItems,
            });
          }
        })
      ),
      null,
      (err) => err
    );
  }

  removeCartItem(rowId: string): Observable<ApiResponse<{ message: string }>> {
    return handleApiResponse(
      this.cartApiService.removeCartItem(rowId).pipe(
        tap((res) => {
          if (res) {
            const cartItems = this.cartStateService.get('cartItems');
            const index = cartItems.findIndex((i) => i.rowId === rowId);
            cartItems.splice(index, 1);
            this.cartStateService.set({
              cartItems,
            });
          }
        })
      ),
      null,
      (err) => err
    );
  }
}
