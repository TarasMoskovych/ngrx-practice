import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouteConfigLoadStart, Router, RouterEvent, RouterModule } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { login } from './auth/+store';
import { MaterialModule } from './material/material.module';
import { AppState } from './reducers';
import { User } from './auth/models/user.model';
import * as fromAuth from './auth/+store';

const user: User = {
  email: 'test@angular-university.io',
  id: 1,
};

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let el: DebugElement;
  let store: Store<AppState>;
  let router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
        RouterModule.forRoot([]),
      ],
      declarations: [
        AppComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch login', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(user));
    spyOn(store, 'dispatch');

    component['getUser']();
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(login({ user }));
  });

  describe('sidenav actions', () => {
    it('should open sidenav when click on menu', () => {
      const btn = el.query(By.css('.menu-button'));
      btn.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(el.query(By.css('mat-sidenav')).nativeElement.classList).toContain('mat-drawer-opened');
    });

    it('should display login when user is logged out', () => {
      const matListItems: DebugElement[] = el.queryAll(By.css('.mat-list-item'));
      expect(matListItems.length).toBe(2);
      expect(matListItems[1].query(By.css('span')).nativeElement.textContent).toBe('Login');
    });

    it('should display logout when user is logged in', () => {
      store.dispatch(login({ user }));
      fixture.detectChanges();

      const matListItems: DebugElement[] = el.queryAll(By.css('.mat-list-item'));
      expect(matListItems.length).toBe(2);
      expect(matListItems[1].query(By.css('span')).nativeElement.textContent).toBe('Logout');
    });

    it('should logout', () => {
      store.dispatch(login({ user }));
      fixture.detectChanges();

      spyOn(store, 'dispatch');
      const logout: DebugElement = el.query(By.css('.mat-list-item:last-child'));
      logout.triggerEventHandler('click', null);

      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });

  describe('loader visibility', () => {
    const event = (event: RouterEvent | RouteConfigLoadStart) => {
      router.events.next(event);
      fixture.detectChanges();
    };
    const assert = (length: number) => expect(el.queryAll(By.css('mat-spinner')).length).toBe(length);

    it('should display loader by default', () => {
      assert(1);
    });

    it('should display loader when "NavigationStart"', () => {
      event(new NavigationStart(1, '/'));
      assert(1);
    });

    it('should display loader when "RouteConfigLoadStart"', () => {
      event(new RouteConfigLoadStart(router));
      assert(1);
    });

    it('should hide loader when "NavigationEnd"', () => {
      event(new NavigationEnd(1, '/', '/'));
      assert(0);
    });

    it('should hide loader when "NavigationCancel"', () => {
      event(new NavigationCancel(1, '/', '/'));
      assert(0);
    });

    it('should hide loader when "NavigationError"', () => {
      event(new NavigationError(1, '/', '/'));
      assert(0);
    });
  });
});
