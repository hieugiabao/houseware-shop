import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'shop-product-cover',
  template: '',
  styleUrls: ['./product-cover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCoverComponent {
  @Input() set imageUrl(url: string | undefined) {
    this.backgroundImage = url && `url(${url})`;
  }
  @Input() set rounded(value: boolean | undefined) {
    this.borderRadius = value ? '50%' : 'initial';
  }

  @HostBinding('style.background-image') backgroundImage!: string | undefined;
  @HostBinding('style.border-radius') borderRadius!: string | undefined;
}
