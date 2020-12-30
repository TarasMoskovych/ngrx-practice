import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { LoadPizzas, ProductsState } from 'src/app/+store';
import { PizzasGuard } from './pizzas.guard';

describe('Pizzas Guard', () => {
  let guard: PizzasGuard;
  let store: Store<ProductsState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        PizzasGuard,
      ],
    });

    guard = TestBed.inject(PizzasGuard);
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(store).toBeTruthy();
  });

  it('should trigger "LoadPizzas"', () => {
    spyOn(store, 'select').and.returnValue(of(false));

    (guard.canActivate() as Observable<boolean>).subscribe();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new LoadPizzas());
  });

  it('should not trigger "LoadPizzas"', () => {
    spyOn(store, 'select').and.returnValue(of(true));

    let result: boolean;
    (guard.canActivate() as Observable<boolean>).subscribe((loaded: boolean) => result = loaded);

    expect(store.dispatch).toHaveBeenCalledTimes(0);
    expect(result).toBeTrue();
  });
});
