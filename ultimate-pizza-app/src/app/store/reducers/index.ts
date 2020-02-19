import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { PizzaState, reducer, getPizzas, getPizzasLoaded, getPizzasLoading } from './pizzas.reducer';

export interface ProductsState {
  pizzas: PizzaState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: reducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');

// pizzas state
export const getPizzaState = createSelector(getProductsState, (state: ProductsState) => state.pizzas);

// pizzas selectors
export const pizzasSelector = createSelector(getPizzaState, getPizzas);
export const pizzasLoadedSelector = createSelector(getPizzaState, getPizzasLoaded);
export const pizzasLoadingSelector = createSelector(getPizzaState, getPizzasLoading);
