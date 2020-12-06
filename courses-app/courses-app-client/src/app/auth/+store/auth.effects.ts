import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { pluck, tap } from 'rxjs/operators';

import { UserData } from '../models/user.model';
import { AuthActions } from './auth.action-types';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private router: Router,
  ) {}

  @Effect({ dispatch: false })
  login$ = this.actions$
    .pipe(
      ofType(AuthActions.login),
      pluck('user'),
      tap((user: UserData) => localStorage.setItem('user', JSON.stringify(user)))
    );

  // login$ = createEffect(() =>
  //   this.actions$
  //     .pipe(
  //       ofType(AuthActions.login),
  //       tap(action => localStorage.setItem('user', JSON.stringify(action.user)))
  //     )
  // , { dispatch: false });

  logout$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        })
      )
  , { dispatch: false });
}
