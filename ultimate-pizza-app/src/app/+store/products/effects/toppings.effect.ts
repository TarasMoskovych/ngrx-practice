import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import * as toppingsActions from './../actions/toppings.action';
import { ToppingsService } from 'src/app/products/services';
import { Topping } from 'src/app/products/models';

@Injectable()
export class ToppingsEffects {

  constructor(
    private actions: Actions, private toppingsService: ToppingsService
  ) { }

  @Effect()
  loadToppings$ = this.actions.pipe(
    ofType(toppingsActions.LOAD_TOPPINGS),
    switchMap(() => {
      return this.toppingsService.getToppings().pipe(
        map((toppings: Topping[]) => new toppingsActions.LoadToppingsSuccess(toppings)),
        catchError(error => of(new toppingsActions.LoadToppingsFail(error)))
      )
    })
  );
}
