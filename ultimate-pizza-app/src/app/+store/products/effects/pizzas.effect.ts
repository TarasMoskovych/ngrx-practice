import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import * as pizzaActions from './../actions';
import { PizzasService } from 'src/app/products/services';
import { Pizza } from 'src/app/products/models';

@Injectable()
export class PizzasEffects {

  constructor(
    private actions: Actions, private pizzasService: PizzasService
  ) { }

  @Effect()
  loadPizzas$ = this.actions.pipe(
    ofType(pizzaActions.LOAD_PIZZAS),
    switchMap(() => {
      return this.pizzasService.getPizzas().pipe(
        map((pizzas: Pizza[]) => new pizzaActions.LoadPizzasSuccess(pizzas)),
        catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
      )
    })
  );
}
