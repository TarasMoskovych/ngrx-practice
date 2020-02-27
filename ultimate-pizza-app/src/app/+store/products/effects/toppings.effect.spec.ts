import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';

import { empty, Observable, of } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';

import { ToppingsService } from 'src/app/products/services';
import { ToppingsEffects } from './toppings.effect';
import { LoadToppings, LoadToppingsSuccess } from '../actions';

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

    spyOn(service, 'getToppings').and.returnValue(of(toppings));
  });

  describe('loadToppings$', () => {
    it('should return a collection from LoadToppingsSuccess', () => {
      const action = new LoadToppings();
      const completion = new LoadToppingsSuccess(toppings);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadToppings$).toBeObservable(expected);
    });
  });
});
