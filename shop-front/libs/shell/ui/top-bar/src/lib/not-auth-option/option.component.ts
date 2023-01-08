import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shop-top-bar-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent {}
