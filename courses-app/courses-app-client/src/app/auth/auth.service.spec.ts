import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { User, UserData } from './models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('AuthService', () => {
  const user: User = {
    email: 'test@gmail.com',
    id: 11,
  };
  const userData: UserData = { ...user, password: 'qq123456' };
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login a user', () => {
    service.login(userData)
      .subscribe((u: User) => {
        expect(u).toBeTruthy();
        expect(u).toEqual(user);
      });

    const req = httpController.expectOne('/api/auth/login');
    expect(req.request.method).toEqual('POST');
    req.flush(user);
  });

  it('should return UnauthorizedException', () => {
    service.login(userData)
      .subscribe(
        () => fail('should return UnauthorizedException'),
        (e: HttpErrorResponse) => expect(e.status).toEqual(401),
      );

    const req = httpController.expectOne('/api/auth/login');
    expect(req.request.method).toEqual('POST');
    req.flush(user, { status: 401, statusText: 'User is not existed' });
  });
});
