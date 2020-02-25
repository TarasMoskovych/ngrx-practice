import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import {
  ProductsState,
  selectedPizzaSelector,
  pizzaVisualisedSelector,
  toppingsSelector,
  VisualiseToppings,
  CreatePizza,
  UpdatePizza,
  RemovePizza
} from 'src/app/+store';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Pizza, Topping } from '../../models';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  toppings$: Observable<Topping[]>;
  visualise$: Observable<Pizza>;

  constructor(private store: Store<ProductsState>) {}

  ngOnInit() {
    this.toppings$ = this.store.select(toppingsSelector);
    this.visualise$ = this.store.select(pizzaVisualisedSelector);
    this.pizza$ = this.store.select(selectedPizzaSelector).pipe(
      tap((pizza: Pizza = null) => {
        this.store.dispatch(new VisualiseToppings(pizza?.toppings
          ? pizza.toppings.map((topping: Topping) => topping.id)
          : []));
      })
    );
  }

  onSelect(event: number[]) {
    this.store.dispatch(new VisualiseToppings(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new CreatePizza(event));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(new UpdatePizza(event));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new RemovePizza(event));
    }
  }

}
