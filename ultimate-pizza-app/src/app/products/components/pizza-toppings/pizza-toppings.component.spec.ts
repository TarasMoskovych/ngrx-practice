import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { Topping, toppings } from '../../models';
import { PizzaToppingsComponent } from './pizza-toppings.component';

@Component({
  template: `
    <form [formGroup]="form">
      <app-pizza-toppings
        [toppings]="toppings"
        formControlName="toppings"
      ></app-pizza-toppings>
    </form>
  `,
})
class TestHostComponent {
  toppings: Topping[] = toppings;

  form = this.fb.group({
    toppings: [[]],
  });

  constructor(private fb: FormBuilder) {}
}

describe('PizzaToppingsComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        TestHostComponent,
        PizzaToppingsComponent,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render list of toppings', () => {
    expect(el.queryAll(By.css('.pizza-toppings-item')).length).toBe(toppings.length);
  });

  it('should add "active" class on item click', () => {
    const item: DebugElement = el.query(By.css('.pizza-toppings-item'));
    expect(item.nativeElement.classList).not.toContain('active');

    item.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(item.nativeElement.classList).toContain('active');
  });

  it('should emit values when user clicks on the items', () => {
    let result: Topping[];
    const items: DebugElement[] = el.queryAll(By.css('.pizza-toppings-item'));

    component.form.get('toppings').valueChanges
      .subscribe((values: Topping[]) => result = values);

    items[0].triggerEventHandler('click', null);
    expect(result.length).toBe(1);

    items[0].triggerEventHandler('click', null);
    expect(result.length).toBe(0);

    items[0].triggerEventHandler('click', null);
    items[1].triggerEventHandler('click', null);
    expect(result.length).toBe(2);
  });
});
