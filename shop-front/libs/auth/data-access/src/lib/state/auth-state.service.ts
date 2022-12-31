import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { CustomerInfomation } from '@shop/shared/data-access/models';

export interface AuthState {
  refreshToken: string;
  accessToken: string;
  expiresIn: Date | null;
  tokenType: string;
  user: CustomerInfomation | null;
}

@Injectable({ providedIn: 'root' })
export class AuthStateService extends RxState<AuthState> {
  token$ = this.select('accessToken');
  tokenExpiry$ = this.select('expiresIn');
  refreshToken$ = this.select('refreshToken');
  currentUser$ = this.select('user');
  isAuthorized$ = this.token$.pipe(map(Boolean));

  get isAuthorized(): boolean {
    return !!this.get().accessToken;
  }

  constructor() {
    super();
    this.reset();
  }

  reset(): void {
    this.set({
      refreshToken: '',
      accessToken: '',
      expiresIn: null,
      tokenType: '',
      user: null,
    });
  }
}
