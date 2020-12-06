import { createAction, props } from '@ngrx/store';

import { User } from '../models/user.model';

export const login = createAction(
  '[Auth] Login User',
  props<{ user: User }>()
);

export const logout = createAction(
  '[Auth] Logout',
);
