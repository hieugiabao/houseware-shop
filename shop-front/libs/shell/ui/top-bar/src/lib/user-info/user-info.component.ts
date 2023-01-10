import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthStateService } from '@shop/auth/data-access';
import { CustomerInfomation } from '@shop/shared/data-access/models';

@Component({
  selector: 'shop-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent implements OnInit {
  public currentUser$!: Observable<CustomerInfomation | null>;

  constructor(private readonly authStateService: AuthStateService) {}

  ngOnInit(): void {
    this.currentUser$ = this.authStateService.currentUser$;
  }
}
