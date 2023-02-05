import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CartStateService } from '@shop/cart/data-access';
import { Cart } from '@shop/shared/data-access/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'shop-cart-feature',
  templateUrl: `./cart-feature.component.html`,
  styleUrls: [`./cart-feature.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  cart$!: Observable<Cart>;

  constructor(private readonly cartStateService: CartStateService) {}

  ngOnInit(): void {
    this.cart$ = this.cartStateService.cart$;
  }
}
