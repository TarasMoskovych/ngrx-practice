import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { AppState } from 'src/app/reducers';
import { User } from '../models/user.model';
import { login, logout } from './auth.actions';
import { authFeatureKey, authReducer } from './auth.reducer';
import { isLoggedIn, isLoggedOut } from './auth.selectors';

const user: User = {
  id: 1,
  email: 'abc@gmai.com',
};

describe('AuthSelectors', () => {
  let store$: Store<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(authFeatureKey, authReducer),
      ],
    });

    store$ = TestBed.inject(Store);
    spyOn(store$, 'dispatch').and.callThrough();
  });

  it('should return isLoggedIn$', () => {
    let result: boolean;

    store$
      .select(isLoggedIn)
      .subscribe((isLoggedIn: boolean) => result = isLoggedIn);

    expect(result).toBeFalse();

    store$.dispatch(login({ user }));
    expect(result).toBeTrue();
  });

  it('should return isLoggedOut$', () => {
    let result: boolean = true;

    store$
      .select(isLoggedOut)
      .subscribe((isLoggedOut: boolean) => result = isLoggedOut);

    expect(result).toBeTrue();

    store$.dispatch(logout());
    expect(result).toBeTrue();
  });
});
