import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { toppingsSelector, pizzaVisualisedSelector, selectedPizzaSelector, CreatePizza, UpdatePizza, RemovePizza, VisualiseToppings } from 'src/app/+store';
import { Pizza, pizzas, Topping, toppings } from '../../models';
import { ProductItemComponent } from './product-item.component';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;
  const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [ ProductItemComponent ],
      providers: [
        { provide: Store, useValue: storeSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;

    storeSpy.select
      .withArgs(toppingsSelector)
      .and.returnValue(of(toppings))
      .withArgs(pizzaVisualisedSelector)
      .and.returnValue(of(pizzas[0]))
      .withArgs(selectedPizzaSelector)
      .and.returnValue(of(pizzas[0]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have list of toppings', () => {
    let result: Topping[];
    fixture.detectChanges();

    component.toppings$.subscribe((values: Topping[]) => result = values);
    expect(result.length).toBe(toppings.length);
  });

  it('should have visualised pizza', () => {
    let result: Pizza;
    fixture.detectChanges();

    component.visualise$.subscribe((value: Pizza) => result = value);
    expect(result).toEqual(pizzas[0]);
  });

  it('should have selected pizza', () => {
    let result: Pizza;
    fixture.detectChanges();

    component.pizza$.subscribe((value: Pizza) => result = value);
    expect(result).toEqual(pizzas[0]);
  });

  it('should dispatch "VisualiseToppings"', () => {
    const payload = pizzas[0].toppings.map((t: Topping) => t.id);

    component.onSelect(payload);
    expect(storeSpy.dispatch).toHaveBeenCalledWith(new VisualiseToppings(payload));
  });

  it('should dispatch "VisualiseToppings" with empty array', () => {
    storeSpy.select
      .withArgs(toppingsSelector)
      .and.returnValue(of(toppings))
      .withArgs(pizzaVisualisedSelector)
      .and.returnValue(of(pizzas[0]))
      .withArgs(selectedPizzaSelector)
      .and.returnValue(of({ id: 10, name: 'Test' }));

    fixture.detectChanges();

    expect(storeSpy.dispatch).toHaveBeenCalledWith(new VisualiseToppings([]));
  });

  it('should dispatch "CreatePizza"', () => {
    const payload: Pizza = pizzas[1];
    component.onCreate(payload);

    expect(storeSpy.dispatch).toHaveBeenCalledWith(new CreatePizza(payload));
  });

  it('should dispatch "UpdatePizza"', () => {
    const payload: Pizza = pizzas[1];
    component.onUpdate(payload);

    expect(storeSpy.dispatch).toHaveBeenCalledWith(new UpdatePizza(payload));
  });

  it('should dispatch "RemovePizza" when user choose "Yes"', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    const payload: Pizza = pizzas[1];
    component.onRemove(payload);

    expect(storeSpy.dispatch).toHaveBeenCalledWith(new RemovePizza(payload));
  });
});
