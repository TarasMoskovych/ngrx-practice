import { Component } from '@angular/core';
import { Router, Params } from '@angular/router';

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { StoreRouterConnectingModule, RouterStateSerializer, RouterReducerState } from '@ngrx/router-store';

import * as fromStore from './../../../+store/products';

import { PizzaEntity } from '../reducers';
import { PizzaState } from '../reducers/pizzas.reducer';
import { getRouterState, reducers, CustomSerializer, RouterStateUrl } from '../../router';
import { Pizza } from 'src/app/products/models';

@Component({
  template: ``
})
class ProductItemComponent { }

describe('Pizzas Selectors', () => {
  let store$: Store<fromStore.ProductsState>;
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;

  const pizza1: Pizza = {
    id: 1,
    name: "Fish 'n Chips",
    toppings: [
      { id: 1, name: 'fish' },
      { id: 2, name: 'chips' },
      { id: 3, name: 'cheese' },
    ],
  };

  const pizza2: Pizza = {
    id: 2,
    name: 'Aloha',
    toppings: [
      { id: 1, name: 'ham' },
      { id: 2, name: 'pineapple' },
      { id: 3, name: 'cheese' },
    ],
  };

  const pizza3: Pizza = {
    id: 3,
    name: 'Burrito',
    toppings: [
      { id: 1, name: 'beans' },
      { id: 2, name: 'beef' },
      { id: 3, name: 'rice' },
      { id: 4, name: 'cheese' },
      { id: 5, name: 'avocado' },
    ],
  };

  const pizzas: Pizza[] = [pizza1, pizza2, pizza3];

  const entities = {
    1: pizzas[0],
    2: pizzas[1],
    3: pizzas[2],
  };

  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{
          path: 'products/:productId',
          component: ProductItemComponent
        }]),
        StoreModule.forRoot({
          ...reducers,
          products: combineReducers(fromStore.reducers)
        }),
        StoreRouterConnectingModule.forRoot({
          stateKey: 'router',
        }),
      ],
      providers: [
        {
          provide: RouterStateSerializer,
          useClass: CustomSerializer,
        },
      ],
      declarations: [ProductItemComponent],
    });

    store$ = TestBed.get(Store);
    router = TestBed.get(Router)
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
  });

  describe('getPizzaState', () => {
    it('should return state of pizza store slice', () => {
      let result: PizzaState;

      store$
        .select(fromStore.getPizzaState)
        .subscribe((pizzas: PizzaState) => result = pizzas);

      expect(result).toEqual({
        entities: {},
        loaded: false,
        loading: false,
      });

      store$.dispatch(new fromStore.LoadPizzasSuccess(pizzas));

      expect(result).toEqual({
        entities,
        loaded: true,
        loading: false,
      });
    });
  });

  describe('getPizzaEntities', () => {
    it('should return pizzas as entities', () => {
      let result: PizzaEntity;

      store$
        .select(fromStore.pizzaEntitiesSelector)
        .subscribe((entity: PizzaEntity) => result = entity);

      expect(result).toEqual({});

      store$.dispatch(new fromStore.LoadPizzasSuccess(pizzas));

      expect(result).toEqual(entities);
    });
  });

  describe('getSelectedPizza', () => {
    it('should return selected pizza as an entity', async() => {
      let result: Pizza;
      let params: Params;

      await fixture.ngZone.run(() => router.navigateByUrl('/products/2'));

      store$.dispatch(new fromStore.LoadPizzasSuccess(pizzas));

      store$
        .select(getRouterState)
        .subscribe((routerState: RouterReducerState<RouterStateUrl>) => {
          params = routerState.state.params;
        });

      expect(params).toEqual({ productId: '2' });

      store$
        .select(fromStore.selectedPizzaSelector)
        .subscribe((selectedPizza: Pizza) => result = selectedPizza);

      expect(result).toEqual(entities[2]);
    });
  });

  describe('getPizzaVisualised', () => {
    it('should return selected pizza composed with selected toppings', async() => {
      let result: Pizza;
      const toppings = [
        {
          id: 6,
          name: 'mushroom',
        },
        {
          id: 9,
          name: 'pepper',
        },
        {
          id: 11,
          name: 'sweetcorn',
        },
      ];

      store$.dispatch(new fromStore.LoadPizzasSuccess(pizzas));
      store$.dispatch(new fromStore.LoadToppingsSuccess(toppings));
      store$.dispatch(new fromStore.VisualiseToppings([11, 9, 6]));

      await fixture.ngZone.run(() => router.navigateByUrl('/products/2'));

      store$
        .select(fromStore.pizzaVisualisedSelector)
        .subscribe((selectedPizza: Pizza) => result = selectedPizza);

      const expectedToppings = [toppings[2], toppings[1], toppings[0]];

      expect(result).toEqual({ ...entities[2], toppings: expectedToppings });
    });
  });

  describe('getAllPizzas', () => {
    it('should return pizzas as an array', () => {
      let result: Pizza[];

      store$
        .select(fromStore.pizzasSelector)
        .subscribe((pizzas: Pizza[]) => result = pizzas);

      expect(result).toEqual([]);

      store$.dispatch(new fromStore.LoadPizzasSuccess(pizzas));

      expect(result).toEqual(pizzas);
    });
  });

  describe('getPizzasLoaded', () => {
    it('should return the pizzas loaded state', () => {
      let result: boolean;

      store$
        .select(fromStore.pizzasLoadedSelector)
        .subscribe((loaded: boolean) => result = loaded);

      expect(result).toEqual(false);

      store$.dispatch(new fromStore.LoadPizzasSuccess([]));

      expect(result).toEqual(true);
    });
  });

  describe('getPizzasLoading', () => {
    it('should return the pizzas loading state', () => {
      let result: boolean;

      store$
        .select(fromStore.pizzasLoadingSelector)
        .subscribe((loading: boolean) => result = loading);

      expect(result).toEqual(false);

      store$.dispatch(new fromStore.LoadPizzas());

      expect(result).toEqual(true);
    });
  });

});
