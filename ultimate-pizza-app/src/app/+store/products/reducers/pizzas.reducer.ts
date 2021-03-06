import * as fromActions from './../actions/pizzas.action';
import { Pizza } from 'src/app/products/models';
import { PizzaEntity } from './';

export interface PizzaState {
  entities: PizzaEntity;
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false,
};

export function pizzasReducer(state = initialState, action: fromActions.PizzasAction): PizzaState {
  switch (action.type) {
    case fromActions.LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromActions.LOAD_PIZZAS_SUCCESS: {
      const entities = action.payload.reduce((acc: PizzaEntity, pizza: Pizza) => {
        return {
          ...acc,
          [pizza.id]: pizza
        }
      }, { ...state.entities });

      return {
        ...state,
        entities,
        loading: false,
        loaded: true
      };
    }

    case fromActions.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromActions.CREATE_PIZZA_SUCCESS:
    case fromActions.UPDATE_PIZZA_SUCCESS: {
      const entities = { ...state.entities, [action.payload.id]: action.payload };

      return {
        ...state,
        entities
      };
    }

    case fromActions.REMOVE_PIZZA_SUCCESS: {
      const { [action.payload.id]: current, ...entities } = state.entities;

      return {
        ...state,
        entities
      };
    }

    default:
      return state;
  }
}

export const getPizzaEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
