import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User, UserData } from './models/user.model';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login({ email, password }: UserData): Observable<User> {
    return this.http.post<User>('/api/auth/login', { email, password });
  }
}
