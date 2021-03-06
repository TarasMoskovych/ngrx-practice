import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppState } from '../reducers';
import { isLoggedIn } from './+store/auth.selectors';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(isLoggedIn)
      .pipe(
        tap((loggedIn: boolean) => !loggedIn && this.router.navigateByUrl('/login'))
      );
  }
}
