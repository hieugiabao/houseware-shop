import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shop-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {}
