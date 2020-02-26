import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, UrlTree } from '@angular/router';

import { Store } from '@ngrx/store';
import { ProductsState, pizzaEntitiesSelector, PizzaEntity } from 'src/app/+store';

import { Observable } from 'rxjs';
import { take, switchMap, map, tap } from 'rxjs/operators';
import { AbstractPizzasGuard } from './abstract-pizzas.guard';
import { Go } from 'src/app/+store/router';

@Injectable({
  providedIn: 'root'
})
export class PizzaExistsGuard extends AbstractPizzasGuard implements CanActivate {

  constructor(protected store: Store<ProductsState>) {
    super(store);
  }

  canActivate(
    route: ActivatedRouteSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.checkPizzaState().pipe(
      switchMap(() => this.hasPizza(route.params.productId)),
      tap((hasPizza: boolean) => !hasPizza && this.store.dispatch(new Go({ path: ['/products'] })))
    );
  }

  private hasPizza(id: number): Observable<boolean> {
    return this.store.select(pizzaEntitiesSelector).pipe(
      map((entities: PizzaEntity) => !!entities[id]),
      take(1)
    );
  }
}
