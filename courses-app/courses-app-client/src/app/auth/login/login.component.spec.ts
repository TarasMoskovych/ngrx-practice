import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { MaterialModule } from 'src/app/material/material.module';
import { AuthActions } from '../+store';
import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';
import { User } from '../models/user.model';

const user: User = {
  id: 1,
  email: 'abc@gmail.com',
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let el: DebugElement;
  let store: Store;
  let router: Router;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('authServiceSpy', {
      login: of(user),
    });

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        NoopAnimationsModule,
        StoreModule.forRoot({}),
        RouterModule.forRoot([]),
        ReactiveFormsModule,
        MaterialModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with initial values', () => {
    const form: DebugElement = el.query(By.css('form')),
          email: DebugElement = form.query(By.css('[type="email"]')),
          password: DebugElement = form.query(By.css('[type="password"]')),
          button: DebugElement = form.query(By.css('button'));

    expect(email.nativeElement.value).toBe('test@angular-university.io');
    expect(password.nativeElement.value).toBe('test');
    expect(button.nativeElement.disabled).toBeFalse();
  });

  it('should disable button when form is invalid', () => {
    component.form.patchValue({ email: '' });
    fixture.detectChanges();

    expect(el.query(By.css('button')).nativeElement.disabled).toBeTrue();
  });

  it('should submit form and return logged user', () => {
    spyOn(store, 'dispatch');
    spyOn(router, 'navigateByUrl');

    const button: DebugElement = el.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(authServiceSpy.login).toHaveBeenCalledOnceWith(component.form.value);
    expect(store.dispatch).toHaveBeenCalledOnceWith(AuthActions.login({ user }));
    expect(router.navigateByUrl).toHaveBeenCalledOnceWith('/courses');
  });
});
