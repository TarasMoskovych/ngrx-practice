import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, switchMap, catchError, pluck } from 'rxjs/operators';
import { of } from 'rxjs';

import * as pizzaActions from './../actions/pizzas.action';
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

  @Effect()
  createPizza$ = this.actions.pipe(
    ofType(pizzaActions.CREATE_PIZZA),
    pluck('payload'),
    switchMap((pizza: Pizza) => {
      return this.pizzasService.createPizza(pizza).pipe(
        map((pizza: Pizza) => new pizzaActions.CreatePizzaSuccess(pizza)),
        catchError(error => of(new pizzaActions.CreatePizzaFail(error)))
      )
    })
  );

  @Effect()
  updatePizza$ = this.actions.pipe(
    ofType(pizzaActions.UPDATE_PIZZA),
    pluck('payload'),
    switchMap((pizza: Pizza) => {
      return this.pizzasService.updatePizza(pizza).pipe(
        map((pizza: Pizza) => new pizzaActions.UpdatePizzaSuccess(pizza)),
        catchError(error => of(new pizzaActions.UpdatePizzaFail(error)))
      )
    })
  );

  @Effect()
  removePizza$ = this.actions.pipe(
    ofType(pizzaActions.REMOVE_PIZZA),
    pluck('payload'),
    switchMap((pizza: Pizza) => {
      return this.pizzasService.removePizza(pizza).pipe(
        map(() => new pizzaActions.RemovePizzaSuccess(pizza)),
        catchError(error => of(new pizzaActions.RemovePizzaFail(error)))
      )
    })
  );
}
