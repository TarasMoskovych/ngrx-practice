import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { AppState } from 'src/app/reducers';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';
import { AuthActions } from '../+store';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  form: FormGroup;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) {

    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });
  }

  login() {
    this.auth.login(this.form.value)
      .pipe(take(1))
      .subscribe((user: User) => {
        this.store.dispatch(AuthActions.login({ user }));
        this.router.navigateByUrl('/courses');
      });
  }
}
