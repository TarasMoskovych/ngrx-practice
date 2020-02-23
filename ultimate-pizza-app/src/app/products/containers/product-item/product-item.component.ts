import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { ProductsState, selectedPizzaSelector } from 'src/app/+store';

import { Observable } from 'rxjs';

import { Pizza, Topping } from '../../models';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  visualise: Pizza;
  toppings: Topping[];

  constructor(private store: Store<ProductsState>) {}

  ngOnInit() {
    this.pizza$ = this.store.select(selectedPizzaSelector);
  }

  onSelect(event: number[]) {
  }

  onCreate(event: Pizza) {
  }

  onUpdate(event: Pizza) {
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
    }
  }

}
