import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from './auth.reducer';

export const authState = createFeatureSelector<AuthState>(authFeatureKey);

export const isLoggedIn = createSelector(
  authState,
  (authState: AuthState) => !!authState.user,
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  (loggedIn: boolean) => !loggedIn,
);
