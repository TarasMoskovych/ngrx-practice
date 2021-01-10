import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';

import { empty, Observable, of, throwError } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';

import { ToppingsService } from 'src/app/products/services';
import { ToppingsEffects } from './toppings.effect';
import { LoadToppings, LoadToppingsFail, LoadToppingsSuccess } from '../actions';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';

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

describe('ToppingsEffects', () => {
  let actions$: TestActions;
  let service: ToppingsService;
  let effects: ToppingsEffects;

  const toppings = [
    { id: 1, name: 'onion' },
    { id: 2, name: 'mushroom' },
    { id: 3, name: 'basil' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ToppingsService,
        ToppingsEffects,
        { provide: Actions, useFactory: getActions },
      ],
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(ToppingsService);
    effects = TestBed.get(ToppingsEffects);
  });

  describe('loadToppings$', () => {
    let expected: TestColdObservable;

    it('should return a collection from LoadToppingsSuccess', () => {
      spyOn(service, 'getToppings').and.returnValue(of(toppings));

      const action = new LoadToppings();
      const completion = new LoadToppingsSuccess(toppings);

      actions$.stream = hot('-a', { a: action });
      expected = cold('-b', { b: completion });
    });

    it('should handle error during LoadToppings', () => {
      const error = 'Error during request';
      spyOn(service, 'getToppings').and.returnValue(throwError(error));

      const action = new LoadToppings();
      const completion = new LoadToppingsFail(error);

      actions$.stream = hot('-a', { a: action });
      expected = cold('-b', { b: completion });
    });

    afterEach(() => {
      expect(effects.loadToppings$).toBeObservable(expected);
    });
  });
});
