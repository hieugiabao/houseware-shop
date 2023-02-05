import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'shop-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartTotalComponent {
  @Input() subtotal!: number;
  @Input() tax!: number;
  @Input() total!: number;
  @Input() discount = 0;
  @Input() delivery = 0;
}
