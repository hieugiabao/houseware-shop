import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shop-cart-feature',
  templateUrl: `./cart-feature.component.html`,
  styleUrls: [`./cart-feature.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {}
