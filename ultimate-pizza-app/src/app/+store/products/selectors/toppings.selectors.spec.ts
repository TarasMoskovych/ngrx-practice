import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromStore from './../../../+store/products';

import { ToppingEntity } from '../reducers';
import { Topping } from 'src/app/products/models';
import { reducers } from '../../router';

describe('Toppings Selectors', () => {
  let store$: Store<fromStore.ProductsState>;
  const toppings: Topping[] = [
    { id: 1, name: 'bacon' },
    { id: 2, name: 'pepperoni' },
    { id: 3, name: 'tomato' },
  ];
  const entities = {
    1: toppings[0],
    2: toppings[1],
    3: toppings[2]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...reducers,
          products: combineReducers(fromStore.reducers)
        })
      ]
    });

    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch').and.callThrough();
  });

  describe('getToppingEntities', () => {
    it('should return toppings as entities', () => {
      let result: ToppingEntity;

      store$
        .select(fromStore.toppingEntitiesSelector)
        .subscribe((entity: ToppingEntity) => result = entity);

        expect(result).toEqual({});

        store$.dispatch(new fromStore.LoadToppingsSuccess(toppings));
        expect(result).toEqual(entities);
    });
  });

  describe('getSelectedToppings', () => {
    it('should return selected toppings as ids', () => {
      let result: number[];

      store$
        .select(fromStore.selectedToppingsSelector)
        .subscribe((entity: number[]) => result = entity);

        store$.dispatch(new fromStore.LoadToppingsSuccess(toppings));
        expect(result).toEqual([]);

        store$.dispatch(new fromStore.VisualiseToppings([1, 3]));
        expect(result).toEqual([1, 3]);
    });
  });

  describe('getAllToppings', () => {
    it('should return toppings as an array', () => {
      let result: Topping[];

      store$
        .select(fromStore.toppingsSelector)
        .subscribe((toppings: Topping[]) => result = toppings);

      expect(result).toEqual([]);

      store$.dispatch(new fromStore.LoadToppingsSuccess(toppings));

      expect(result).toEqual(toppings);
    });
  });

  describe('getToppingsLoaded', () => {
    it('should return the toppings loaded state', () => {
      let result: boolean;

      store$
        .select(fromStore.toppingsLoadedSelector)
        .subscribe((loaded: boolean) => result = loaded);

      expect(result).toEqual(false);

      store$.dispatch(new fromStore.LoadToppingsSuccess([]));

      expect(result).toEqual(true);
    });
  });

  describe('getToppingsLoading', () => {
    it('should return the toppings loading state', () => {
      let result: boolean;

      store$
        .select(fromStore.toppingsLoadingSelector)
        .subscribe((loading: boolean) => result = loading);

      expect(result).toEqual(false);

      store$.dispatch(new fromStore.LoadToppings());

      expect(result).toEqual(true);
    });
  });

});
