import { CartService } from '@shop/cart/data-access';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ApiResponseStatus, CartItem } from '@shop/shared/data-access/models';
import { tap } from 'rxjs';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'shop-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent implements OnInit {
  @Input() item!: CartItem;
  quantity!: number;
  loading = false;

  constructor(
    private readonly cartService: CartService,
    private readonly cdf: ChangeDetectorRef,
    private readonly confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.quantity = this.item?.qty || 0;
  }

  onQuantityChange(quantity: number): void {
    this.cartService
      .updateCartItem(this.item.rowId, quantity)
      .pipe(
        tap((res) => {
          this.loading = res.status === ApiResponseStatus.Loading;
          if (res.status === ApiResponseStatus.Success) {
            this.item.qty = quantity;
            this.quantity = quantity;
            this.cdf.markForCheck();
          }
        })
      )
      .subscribe();
  }

  onRemove(): void {
    this.cartService
      .removeCartItem(this.item.rowId)
      .pipe(
        tap((res) => {
          this.loading = res.status === ApiResponseStatus.Loading;
          if (res.status === ApiResponseStatus.Success) {
            this.item.qty = 0;
            this.quantity = 0;
            this.cdf.markForCheck();
          }
        })
      )
      .subscribe();
  }

  confirmRemove(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to remove this item?',
      accept: () => {
        this.onRemove();
      },
      // reject: () => {},
    });
  }
}
