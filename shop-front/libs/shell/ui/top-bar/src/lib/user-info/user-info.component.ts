import { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthStateService } from '@shop/auth/data-access';

@Component({
  selector: 'shop-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent implements OnInit {
  public username = '';

  constructor(private readonly authStateService: AuthStateService) {}

  ngOnInit(): void {
    this.authStateService.currentUser$.subscribe((user) => {
      this.username = user?.name || '';
    });
  }
}
