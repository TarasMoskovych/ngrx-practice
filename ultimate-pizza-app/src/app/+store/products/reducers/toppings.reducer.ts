import * as fromActions from './../actions/toppings.action';
import { ToppingEntity } from '.';
import { Topping } from 'src/app/products/models';

export interface ToppingState {
  entities: ToppingEntity;
  loaded: boolean;
  loading: boolean;
  selectedToppings: number[];
}

export const initialState: ToppingState = {
  entities: {},
  loaded: false,
  loading: false,
  selectedToppings: [],
};

export function toppingsReducer(state = initialState, action: fromActions.ToppingsAction): ToppingState {
  switch(action.type) {
    case fromActions.LOAD_TOPPINGS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromActions.LOAD_TOPPINGS_SUCCESS: {
      const entities = action.payload.reduce((acc: ToppingEntity, topping: Topping) => {
        return {
          ...acc,
          [topping.id]: topping
        }
      }, { ...state.entities });

      return {
        ...state,
        entities,
        loading: false,
        loaded: true,
      };
    }

    case fromActions.LOAD_TOPPINGS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromActions.VISUALISE_TOPPINGS: {
      return {
        ...state,
        selectedToppings: action.payload
      };
    }

    default:
      return state;
  }
}

export const getToppingEntities = (state: ToppingState) => state.entities;
export const getToppingsLoading = (state: ToppingState) => state.loading;
export const getToppingsLoaded = (state: ToppingState) => state.loaded;
export const getSelectedToppings = (state: ToppingState) => state.selectedToppings;
