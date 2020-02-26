import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Effect, Actions, ofType } from '@ngrx/effects';
import * as routerActions from './../actions';

import { pluck, tap } from 'rxjs/operators';

@Injectable()
export class RouterEffects {

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) { }

  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType<routerActions.Go>(routerActions.GO),
    pluck('payload'),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.pipe(
    ofType<routerActions.Back>(routerActions.BACK),
    tap(() => this.location.back())
  );

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.pipe(
    ofType<routerActions.Forward>(routerActions.FORWARD),
    tap(() => this.location.forward())
  );

}
