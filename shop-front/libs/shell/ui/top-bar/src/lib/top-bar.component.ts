import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { AuthStateService } from '@shop/auth/data-access';
import { CustomerInfomation } from '@shop/shared/data-access/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shop-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;
  currentUser!: CustomerInfomation | null;

  constructor(
    private readonly authStateService: AuthStateService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.authStateService.currentUser$.subscribe({
      next: (user) => {
        this.currentUser = user;
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
