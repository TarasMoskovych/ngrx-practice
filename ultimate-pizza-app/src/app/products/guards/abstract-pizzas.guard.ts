import { Store } from '@ngrx/store';
import { ProductsState, pizzasLoadedSelector, LoadPizzas } from 'src/app/+store';

import { Observable } from 'rxjs';
import { tap, filter, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AbstractPizzasGuard {

  constructor(protected store: Store<ProductsState>) { }

  protected checkPizzaState(): Observable<boolean> {
    return this.store.select(pizzasLoadedSelector).pipe(
      tap((loaded: boolean) => !loaded && this.store.dispatch(new LoadPizzas())),
      filter((loaded: boolean) => loaded),
      take(1)
    );
  }
}
