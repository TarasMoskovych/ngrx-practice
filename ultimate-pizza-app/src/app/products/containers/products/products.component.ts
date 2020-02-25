import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from './../../../+store';
import { Pizza } from '../../models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;

  constructor(private store: Store<fromStore.ProductsState>) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadPizzas());
    this.store.dispatch(new fromStore.LoadToppings());

    this.pizzas$ = this.store.select(fromStore.pizzasSelector);
  }
}
