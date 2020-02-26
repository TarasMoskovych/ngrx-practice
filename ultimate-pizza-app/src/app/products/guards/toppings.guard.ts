import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';

import { Store } from '@ngrx/store';
import { ProductsState, toppingsLoadedSelector, LoadToppings } from 'src/app/+store';

import { Observable, of } from 'rxjs';
import { tap, switchMap, catchError, filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToppingsGuard implements CanActivate {

  constructor(private store: Store<ProductsState>) { }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.checkToppingState().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private checkToppingState(): Observable<boolean> {
    return this.store.select(toppingsLoadedSelector).pipe(
      tap((loaded: boolean) => !loaded && this.store.dispatch(new LoadToppings())),
      filter((loaded: boolean) => loaded),
      take(1)
    );
  }
}
