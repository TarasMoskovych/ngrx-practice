import { createSelector } from '@ngrx/store';
import { ProductsState, getProductsState, ToppingEntity } from '../reducers';
import { getToppingEntities, getToppingsLoaded, getToppingsLoading, getSelectedToppings } from '../reducers/toppings.reducer';

export const getToppingState = createSelector(getProductsState, (state: ProductsState) => state.toppings);

export const toppingEntitiesSelector = createSelector(getToppingState, getToppingEntities);
export const selectedToppingsSelector = createSelector(getToppingState, getSelectedToppings);
export const toppingsSelector = createSelector(
  toppingEntitiesSelector,
  (entities: ToppingEntity) => Object.keys(entities).map((id: string) => entities[id])
);
export const toppingsLoadedSelector = createSelector(getToppingState, getToppingsLoaded);
export const toppingsLoadingSelector = createSelector(getToppingState, getToppingsLoading);
