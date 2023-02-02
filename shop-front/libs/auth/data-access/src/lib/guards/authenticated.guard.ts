import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { take } from 'rxjs';
import { Observable } from 'rxjs';
import { AuthStateService } from '../state/auth-state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard
  implements CanActivate, CanActivateChild, CanLoad
{
  constructor(private readonly authStateService: AuthStateService) {}

  canActivate(): Observable<boolean> {
    return this.isAuthenticated();
  }

  canActivateChild(): Observable<boolean> {
    return this.isAuthenticated();
  }

  canLoad(): Observable<boolean> {
    return this.isAuthenticated();
  }

  private isAuthenticated() {
    return this.authStateService.isAuthorized$.pipe(take(1));
  }
}
