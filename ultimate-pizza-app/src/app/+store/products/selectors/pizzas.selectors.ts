import { createSelector } from '@ngrx/store';
import { getRouterState } from './../../router';
import { ProductsState, PizzaEntity, getProductsState, ToppingEntity } from '../reducers';
import { getPizzaEntities, getPizzasLoading, getPizzasLoaded } from '../reducers/pizzas.reducer';
import { toppingEntitiesSelector, selectedToppingsSelector } from './toppings.selectors';
import { Pizza } from 'src/app/products/models';

export const getPizzaState = createSelector(getProductsState, (state: ProductsState) => state.pizzas);

export const pizzaEntitiesSelector = createSelector(getPizzaState, getPizzaEntities);
export const pizzasSelector = createSelector(
  pizzaEntitiesSelector,
  (entities: PizzaEntity) => Object.keys(entities).map((id: string) => entities[id])
);
export const selectedPizzaSelector = createSelector(
  pizzaEntitiesSelector,
  getRouterState,
  (entities: PizzaEntity, router): Pizza => {
    return router.state && entities[router.state.params.productId];
  }
);
export const pizzaVisualisedSelector = createSelector(
  selectedPizzaSelector,
  toppingEntitiesSelector,
  selectedToppingsSelector,
  (pizza: Pizza, toppingEntities: ToppingEntity, selectedToppings: number[]) => {
    const toppings = selectedToppings.map((id: number) => toppingEntities[id]);
    return { ...pizza, toppings };
  }
);
export const pizzasLoadedSelector = createSelector(getPizzaState, getPizzasLoaded);
export const pizzasLoadingSelector = createSelector(getPizzaState, getPizzasLoading);
