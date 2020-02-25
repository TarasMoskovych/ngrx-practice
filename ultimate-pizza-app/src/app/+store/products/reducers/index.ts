import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { PizzaState, pizzasReducer } from './pizzas.reducer';
import { ToppingState, toppingsReducer } from './toppings.reducer';

import { Pizza, Topping } from 'src/app/products/models';

export interface ProductsState {
  pizzas: PizzaState;
  toppings: ToppingState;
}

export interface PizzaEntity {
  [id: number]: Pizza;
}

export interface ToppingEntity {
  [id: number]: Topping;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: pizzasReducer,
  toppings: toppingsReducer,
};

export const getProductsState = createFeatureSelector<ProductsState>('products');
