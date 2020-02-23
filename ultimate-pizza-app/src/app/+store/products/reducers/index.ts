import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { PizzaState, reducer, getPizzaEntities, getPizzasLoaded, getPizzasLoading } from './pizzas.reducer';
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

// pizzas state
export const getPizzaState = createSelector(getProductsState, (state: ProductsState) => state.pizzas);

// pizzas selectors
export const pizzaEntitiesSelector = createSelector(getPizzaState, getPizzaEntities);
export const pizzasSelector = createSelector(
  pizzaEntitiesSelector,
  (entities: PizzaEntity) => Object.keys(entities).map((id: string) => entities[id])
);

export const pizzasLoadedSelector = createSelector(getPizzaState, getPizzasLoaded);
export const pizzasLoadingSelector = createSelector(getPizzaState, getPizzasLoading);
