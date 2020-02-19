import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { Pizza } from '../../models';
import { PizzasService } from '../../services';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  pizzas: Pizza[];

  constructor(private pizzaService: PizzasService) {}

  ngOnInit() {
    this.pizzaService.getPizzas()
      .pipe(take(1))
      .subscribe((pizzas: Pizza[]) => {
        this.pizzas = pizzas;
      });
  }
}
