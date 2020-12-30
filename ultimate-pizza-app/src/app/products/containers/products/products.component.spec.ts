import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { ProductsState } from 'src/app/+store';
import { Pizza, pizzas } from '../../models';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let store: Store<ProductsState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [ ProductsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'select').and.returnValue(of(pizzas));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return list of pizzas', () => {
    component.pizzas$.subscribe((values: Pizza[]) => {
      expect(values.length).toBe(pizzas.length);
    });
  });

  it('should render list of pizzas', () => {
    expect(fixture.debugElement.queryAll(By.css('app-pizza-item')).length).toBe(pizzas.length);
  });
});
