import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Actions } from '@ngrx/effects';
import { empty, Observable, of, throwError } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';

import { PizzasService } from 'src/app/products/services';
import { PizzasEffects } from './pizzas.effect';
import {
  LoadPizzas,
  LoadPizzasSuccess,
  CreatePizza,
  CreatePizzaSuccess,
  UpdatePizza,
  UpdatePizzaSuccess,
  RemovePizza,
  RemovePizzaSuccess,
  LoadPizzasFail,
  CreatePizzaFail,
  UpdatePizzaFail,
  RemovePizzaFail
} from '../actions';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { Go } from '../../router';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

const error = 'Error during request';

describe('PizzasEffects', () => {
  let actions$: TestActions;
  let service: PizzasService;
  let effects: PizzasEffects;

  const pizzas = [
    {
      id: 1,
      name: 'Pizza #1',
      toppings: [
        { id: 1, name: 'onion' },
        { id: 2, name: 'mushroom' },
        { id: 3, name: 'basil' },
      ],
    },
    {
      id: 2,
      name: 'Pizza #2',
      toppings: [
        { id: 1, name: 'onion' },
        { id: 2, name: 'mushroom' },
        { id: 3, name: 'basil' },
      ],
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PizzasService,
        PizzasEffects,
        { provide: Actions, useFactory: getActions },
      ],
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(PizzasService);
    effects = TestBed.get(PizzasEffects);
  });

  describe('loadPizzas$', () => {
    let expected: TestColdObservable;

    it('should return a collection from LoadPizzasSuccess', () => {
      spyOn(service, 'getPizzas').and.returnValue(of(pizzas));

      const action = new LoadPizzas();
      const completion = new LoadPizzasSuccess(pizzas);

      actions$.stream = hot('-a', { a: action });
      expected = cold('-b', { b: completion });
    });

    it('should handle error during LoadPizzas', () => {
      spyOn(service, 'getPizzas').and.returnValue(throwError(error));

      const action = new LoadPizzas();
      const completion = new LoadPizzasFail(error);

      actions$.stream = hot('-a', { a: action });
      expected = cold('-b', { b: completion });
    });

    afterEach(() => {
      expect(effects.loadPizzas$).toBeObservable(expected);
    });
  });

  describe('createPizza$', () => {
    let expected: TestColdObservable;

    it('should work', () => {
      spyOn(service, 'createPizza').and.returnValue(of(pizzas[0]));

      const action = new CreatePizza(pizzas[0]);
      const completion = new CreatePizzaSuccess(pizzas[0]);

      actions$.stream = hot('-a', { a: action });
      expected = cold('-c', { c: completion });
    });

    it('should handle error during CreatePizza', () => {
      spyOn(service, 'createPizza').and.returnValue(throwError(error));

      const action = new CreatePizza(pizzas[0]);
      const completion = new CreatePizzaFail(error);

      actions$.stream = hot('-a', { a: action });
      expected = cold('-c', { c: completion });
    });

    afterEach(() => {
      expect(effects.createPizza$).toBeObservable(expected);
    });
  });

  describe('updatePizza$', () => {
    let expected: TestColdObservable;

    it('should work', () => {
      spyOn(service, 'updatePizza').and.returnValue(of(pizzas[0]));

      const action = new UpdatePizza(pizzas[0]);
      const completion = new UpdatePizzaSuccess(pizzas[0]);

      actions$.stream = hot('-a', { a: action });
      expected = cold('-c', { c: completion });
    });

    it('should handle error during UpdatePizza', () => {
      spyOn(service, 'updatePizza').and.returnValue(throwError(error));

      const action = new UpdatePizza(pizzas[0]);
      const completion = new UpdatePizzaFail(error);

      actions$.stream = hot('-a', { a: action });
      expected = cold('-c', { c: completion });
    });

    afterEach(() => {
      expect(effects.updatePizza$).toBeObservable(expected);
    });
  });

  describe('removePizza$', () => {
    let expected: TestColdObservable;

    it('should work', () => {
      spyOn(service, 'removePizza').and.returnValue(of(pizzas[0]));

      const action = new RemovePizza(pizzas[0]);
      const completion = new RemovePizzaSuccess(pizzas[0]);

      actions$.stream = hot('-a', { a: action });
      expected = cold('-c', { c: completion });
    });

    it('should handle error during RemovePizza', () => {
      spyOn(service, 'removePizza').and.returnValue(throwError(error));

      const action = new RemovePizza(pizzas[0]);
      const completion = new RemovePizzaFail(error);

      actions$.stream = hot('-a', { a: action });
      expected = cold('-c', { c: completion });
    });

    afterEach(() => {
      expect(effects.removePizza$).toBeObservable(expected);
    });
  });

  describe('createPizzaSuccess$', () => {
    it('should work', () => {
      const action = new CreatePizzaSuccess(pizzas[0]);
      const completion = new Go({ path: ['/products', 1] });

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.createPizzaSuccess$).toBeObservable(expected);
    });
  });

  describe('removeUpdatePizzaSuccess$', () => {
    it('should work', () => {
      const action = new RemovePizzaSuccess(pizzas[0]);
      const completion = new Go({ path: ['/products'] });

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.removeUpdatePizzaSuccess$).toBeObservable(expected);
    });
  });
});
