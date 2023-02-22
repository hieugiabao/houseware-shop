import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'shop-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  @Input() id!: number;
  @Input() imageUrl: string | undefined;
  @Input() title!: string;
  @Input() price!: number;
  @Input() description: string | undefined;
  @Input() link!: string;
  @Input() roundedImage? = false;
  @Input() quantity!: number;
  @Input() categories!: string[];
  @Output() addToCart = new EventEmitter<number>();
}
