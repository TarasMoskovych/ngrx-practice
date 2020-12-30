import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { LoadPizzas, ProductsState } from 'src/app/+store';
import { Go } from 'src/app/+store/router';
import { PizzaExistsGuard } from './pizza-exists.guard';

describe('PizzaExists Guard', () => {
  let guard: PizzaExistsGuard;
  let store: Store<ProductsState>;
  let route: ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        PizzaExistsGuard,
        { provide: ActivatedRouteSnapshot,
          useValue: {
            params: {
              'productId': '1',
            },
          },
        },
      ],
    });

    guard = TestBed.inject(PizzaExistsGuard);
    store = TestBed.inject(Store);
    route = TestBed.inject(ActivatedRouteSnapshot);

    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(store).toBeTruthy();
  });

  it('should trigger "LoadPizzas"', () => {
    spyOn(store, 'select').and.returnValue(of(false));

    (guard.canActivate(route) as Observable<boolean>).subscribe();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new LoadPizzas());
  });

  it('should dispatch redirect when empty pizzas', () => {
    spyOn(store, 'select').and.returnValue(of(true));

    (guard.canActivate(route) as Observable<boolean>).subscribe();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new Go({ path: ['/products'] }));
  });
});
