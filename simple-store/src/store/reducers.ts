import { Action, State, Todo } from '../models';
import * as actions from './actions';

export const initialState: State = {
  loaded: false,
  loading: false,
  data: [
    {
      label: 'Eat pizza',
      complete: false
    }
  ]
};

export function reducer(state = initialState, action: Action) {
  switch(action.type) {
    case actions.ADD_TODO: {
      const data = [...state.data, action.payload];
      return {
        ...state,
        data,
      };
    }

    case actions.REMOVE_TODO: {
      const data = state.data.filter((todo: Todo) => todo.label !== action.payload.label);
      return {
        ...state,
        data,
      };
    }
  }

  return state;
}
