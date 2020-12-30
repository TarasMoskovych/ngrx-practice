import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { AbstractPizzasGuard } from './abstract-pizzas.guard';

@Injectable({
  providedIn: 'root'
})
export class PizzasGuard extends AbstractPizzasGuard implements CanActivate {

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.checkPizzaState().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
}
