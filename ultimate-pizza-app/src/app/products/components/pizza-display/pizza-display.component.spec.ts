import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PizzaDisplayComponent } from './pizza-display.component';
import { pizzas } from '../../models';

describe('PizzaDisplayComponent', () => {
  let component: PizzaDisplayComponent;
  let fixture: ComponentFixture<PizzaDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzaDisplayComponent ],
      imports: [NoopAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaDisplayComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render list of toppings', () => {
    component.pizza = pizzas[0];
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('.pizza-display__topping')).length).toBe(pizzas[0].toppings.length);
  });
});
