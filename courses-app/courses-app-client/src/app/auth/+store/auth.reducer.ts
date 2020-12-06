import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import { User } from '../models/user.model';
import { AuthActions } from './auth.action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: null,
};

export const authReducer = createReducer<AuthState>(
  initialAuthState,
  on(AuthActions.login, (state: AuthState, action) => {
    return {
      user: action.user,
    };
  }),
  on(AuthActions.logout, (state: AuthState) => {
    return {
      user: null,
    };
  }),
);
