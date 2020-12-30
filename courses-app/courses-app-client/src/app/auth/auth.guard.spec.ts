import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ActivatedRouteSnapshot, Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';

import { AuthGuard } from './auth.guard';
import { AppState } from '../reducers';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let store: Store<AppState>;
  let route: ActivatedRouteSnapshot;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        RouterModule.forRoot([]),
      ],
      providers: [AuthGuard,],
    });

    guard = TestBed.inject(AuthGuard);
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    route = new ActivatedRouteSnapshot();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect to login when user is logged out', () => {
    spyOn(store, 'select').and.returnValue(of(false));
    spyOn(router, 'navigateByUrl');

    guard.canActivate(route, null).subscribe((isLoggedIn: boolean) => {
      expect(isLoggedIn).toBeFalse();
      expect(router.navigateByUrl).toHaveBeenCalledOnceWith('/login');
    });
  });

  it('should return true when user is logged in', () => {
    spyOn(store, 'select').and.returnValue(of(true));
    spyOn(router, 'navigateByUrl');

    guard.canActivate(route, null).subscribe((isLoggedIn: boolean) => {
      expect(isLoggedIn).toBeTrue();
      expect(router.navigateByUrl).toHaveBeenCalledTimes(0);
    });
  });
});
