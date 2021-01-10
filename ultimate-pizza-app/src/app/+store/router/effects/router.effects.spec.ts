import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { cold } from 'jasmine-marbles';

import { Back, Forward, Go } from '../actions';
import { RouterEffects } from './router.effects';
import { Action } from '@ngrx/store';

describe('RouterEffects', () => {
  let actions$: Observable<Action>;
  let effects: RouterEffects;
  let routerSpy: jasmine.SpyObj<Router>;
  let locationSpy: jasmine.SpyObj<Location>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    locationSpy = jasmine.createSpyObj('Location', ['back', 'forward']);

    TestBed.configureTestingModule({
      providers: [
        RouterEffects,
        { provide: Router, useValue: routerSpy },
        { provide: Location, useValue: locationSpy },
        provideMockActions( () => actions$ ),
      ],
    });

    effects = TestBed.get(RouterEffects);
  });

  describe('navigate$', () => {
    it('should work', () => {
      const payload = { path: ['/products'], query: { id: 1 } };
      actions$ = cold('a', { a: new Go(payload) });

      effects.navigate$.subscribe(() => {
        expect(routerSpy.navigate).toHaveBeenCalledWith(payload.path, { queryParams: payload.query });
      });
    });
  });

  describe('navigateBack$', () => {
    it('should work', () => {
      actions$ = cold('a', { a: new Back() });

      effects.navigateBack$.subscribe(() => {
        expect(locationSpy.back).toHaveBeenCalled();
      });
    });
  });

  describe('navigateForward$', () => {
    it('should work', () => {
      actions$ = cold('a', { a: new Forward() });

      effects.navigateForward$.subscribe(() => {
        expect(locationSpy.forward).toHaveBeenCalled();
      });
    });
  });
});
