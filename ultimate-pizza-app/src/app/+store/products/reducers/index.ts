import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { PizzaState, reducer } from './pizzas.reducer';
import { Pizza } from 'src/app/products/models';

export interface ProductsState {
  pizzas: PizzaState;
}

export interface PizzaEntity {
  [id: number]: Pizza;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: reducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');
