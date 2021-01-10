import { Component, DebugElement, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { Pizza, pizzas, Topping, toppings } from '../../models';
import { PizzaToppingsComponent } from '../pizza-toppings/pizza-toppings.component';
import { PizzaFormComponent } from './pizza-form.component';

@Component({
  template: `
    <app-pizza-form
      [pizza]="pizza"
      [toppings]="toppings"
      (selected)="onSelected($event)"
      (create)="onCreate($event)"
      (update)="onUpdate($event)"
      (remove)="onRemove($event)"
    ></app-pizza-form>
  `,
})
class TestHostComponent {
  @ViewChild(PizzaFormComponent) pizzaFormComponent: PizzaFormComponent;

  pizza: Pizza = pizzas[0];
  toppings: Topping[] = toppings;

  onSelected(e: number) {}
  onCreate(e: Pizza) {}
  onUpdate(e: Pizza) {}
  onRemove(e: Pizza) {}
}

describe('PizzaFormHostComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let el: DebugElement;
  let actionBtn: DebugElement;
  let form: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [
        TestHostComponent,
        PizzaFormComponent,
        PizzaToppingsComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not create pizza when form is invalid', () => {
    spyOn(component, 'onCreate');

    component.pizza = null;
    fixture.detectChanges();
    actionBtn = el.query(By.css('.pizza-form__actions .btn:first-child'));
    form = el.query(By.css('form'));
    actionBtn.triggerEventHandler('click', null);

    expect(component.onCreate).toHaveBeenCalledTimes(0);
    expect(form.nativeElement.classList).toContain('ng-invalid');
    expect(actionBtn.nativeElement.textContent.trim()).toBe('Create Pizza');
  });

  it('should create pizza when form is valid', () => {
    spyOn(component, 'onCreate');

    component.pizza = null;
    fixture.detectChanges();
    actionBtn = el.query(By.css('.pizza-form__actions .btn:first-child'));
    form = el.query(By.css('form'));

    component.pizzaFormComponent.form.patchValue({ name: 'New pizza' });
    actionBtn.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.onCreate).toHaveBeenCalledTimes(1);
    expect(component.onCreate).toHaveBeenCalledWith({ name: 'New pizza', toppings: [] });
    expect(form.nativeElement.classList).toContain('ng-valid');
    expect(actionBtn.nativeElement.textContent.trim()).toBe('Create Pizza');
  });

  it('should not update pizza when form is untouched', () => {
    spyOn(component, 'onUpdate');

    fixture.detectChanges();
    actionBtn = el.query(By.css('.pizza-form__actions .btn:first-child'));
    form = el.query(By.css('form'));
    actionBtn.triggerEventHandler('click', null);

    expect(component.onUpdate).toHaveBeenCalledTimes(0);
    expect(form.nativeElement.classList).toContain('ng-valid');
    expect(form.nativeElement.classList).toContain('ng-untouched');
    expect(actionBtn.nativeElement.textContent.trim()).toBe('Save changes');
  });

  it('should update pizza when form is touched', () => {
    spyOn(component, 'onUpdate');

    fixture.detectChanges();
    actionBtn = el.query(By.css('.pizza-form__actions .btn:first-child'));
    form = el.query(By.css('form'));

    component.pizzaFormComponent.form.patchValue({ name: 'updated' });
    component.pizzaFormComponent.form.markAsTouched();
    actionBtn.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.onUpdate).toHaveBeenCalledTimes(1);
    expect(component.onUpdate).toHaveBeenCalledWith({ ...pizzas[0], name: 'updated' });
    expect(form.nativeElement.classList).toContain('ng-valid');
    expect(form.nativeElement.classList).toContain('ng-touched');
    expect(actionBtn.nativeElement.textContent.trim()).toBe('Save changes');
  });

  it('should remove pizza', () => {
    spyOn(component, 'onRemove');

    fixture.detectChanges();
    actionBtn = el.query(By.css('.pizza-form__actions .btn:last-child'));
    actionBtn.triggerEventHandler('click', null);

    expect(component.onRemove).toHaveBeenCalledTimes(1);
    expect(component.onRemove).toHaveBeenCalledWith(pizzas[0]);
    expect(actionBtn.nativeElement.textContent.trim()).toBe('Delete Pizza');
  });

  it('should emit "select"', () => {
    spyOn(component, 'onSelected');

    fixture.detectChanges();
    el.query(By.css('.pizza-toppings-item')).triggerEventHandler('click', null);

    expect(component.onSelected).toHaveBeenCalled();
  });
});
