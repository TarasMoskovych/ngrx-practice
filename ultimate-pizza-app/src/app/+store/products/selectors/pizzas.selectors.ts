import { createSelector } from '@ngrx/store';
import { getRouterState, RouterStateUrl } from './../../router';
import { ProductsState, PizzaEntity, getProductsState } from '../reducers';
import { getPizzaEntities, getPizzasLoading, getPizzasLoaded } from '../reducers/pizzas.reducer';
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
export const pizzasLoadedSelector = createSelector(getPizzaState, getPizzasLoaded);
export const pizzasLoadingSelector = createSelector(getPizzaState, getPizzasLoading);
