import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Actions } from '@ngrx/effects';
import { empty, Observable, of } from 'rxjs';
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
  RemovePizzaSuccess
} from '../actions';

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

    spyOn(service, 'getPizzas').and.returnValue(of(pizzas));
    spyOn(service, 'createPizza').and.returnValue(of(pizzas[0]));
    spyOn(service, 'updatePizza').and.returnValue(of(pizzas[0]));
    spyOn(service, 'removePizza').and.returnValue(of(pizzas[0]));
  });

  describe('loadPizzas$', () => {
    it('should return a collection from LoadPizzasSuccess', () => {
      const action = new LoadPizzas();
      const completion = new LoadPizzasSuccess(pizzas);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadPizzas$).toBeObservable(expected);
    });
  });

  describe('createPizza$', () => {
    it('should work', () => {
      const action = new CreatePizza(pizzas[0]);
      const completion = new CreatePizzaSuccess(pizzas[0]);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.createPizza$).toBeObservable(expected);
    });
  });

  describe('updatePizza$', () => {
    it('should work', () => {
      const action = new UpdatePizza(pizzas[0]);
      const completion = new UpdatePizzaSuccess(pizzas[0]);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.updatePizza$).toBeObservable(expected);
    });
  });

  describe('removePizza$', () => {
    it('should work', () => {
      const action = new RemovePizza(pizzas[0]);
      const completion = new RemovePizzaSuccess(pizzas[0]);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.removePizza$).toBeObservable(expected);
    });
  });
});