import { User } from '../models/user.model';
import { login, logout } from './auth.actions';
import { initialAuthState, authReducer } from './auth.reducer';

const user: User = {
  id: 1,
  email: 'abc@gmai.com',
};

describe('AuthReducer', () => {

  it('should return the default state', () => {
    const state = authReducer(undefined, {} as any);

    expect(state).toBe(initialAuthState);
  });

  it('should set user', () => {
    const state = authReducer(initialAuthState, login({ user }));

    expect(state.user).toEqual(user);
  });

  it('should clear user', () => {
    const state = authReducer(initialAuthState, login({ user }));

    expect(state.user).toEqual(user);
    expect(authReducer(state, logout)).toEqual(initialAuthState);
  });
});
