import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { LoadToppings, ProductsState } from 'src/app/+store';
import { ToppingsGuard } from './toppings.guard';

describe('Toppings Guard', () => {
  let guard: ToppingsGuard;
  let store: Store<ProductsState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
      ],
      providers: [
        ToppingsGuard,
      ],
    });

    guard = TestBed.inject(ToppingsGuard);
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should dispatch "LoadToppings"', () => {
    spyOn(store, 'select').and.returnValue(of(false));

    (guard.canActivate() as Observable<boolean>).subscribe();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new LoadToppings());
  });

  it('should not dispatch "LoadToppings"', () => {
    spyOn(store, 'select').and.returnValue(of(true));

    (guard.canActivate() as Observable<boolean>).subscribe();
    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });
});
