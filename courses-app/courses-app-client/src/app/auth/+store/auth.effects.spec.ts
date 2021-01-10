import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { AuthEffects } from './auth.effects';
import { login, logout } from './auth.actions';
import { UserData } from '../models/user.model';

describe('AuthEffects', () => {
  let actions$: Observable<Action>;
  let effects: AuthEffects;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        { provide: Router, useValue: routerSpy },
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(AuthEffects);
  });

  describe('login$', () => {
    it('should work', () => {
      spyOn(localStorage, 'setItem');

      const user: UserData = { id: 1, email: 'abc@gmail.com', password: '1111' };
      actions$ = of(login({ user }));
      effects.login$.subscribe();

      expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(user));
    });
  });

  describe('logout$', () => {
    it('should work', () => {
      spyOn(localStorage, 'removeItem');

      actions$ = of(logout());
      effects.logout$.subscribe();

      expect(localStorage.removeItem).toHaveBeenCalled();
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
    });
  });
});
