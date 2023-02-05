import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CartStateService } from '@shop/cart/data-access';
import { CartItem } from '@shop/shared/data-access/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'shop-cart-feature',
  templateUrl: `./cart-feature.component.html`,
  styleUrls: [`./cart-feature.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  cartItems$!: Observable<CartItem[]>;

  constructor(private readonly cartStateService: CartStateService) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartStateService.cartItems$;
  }
}
