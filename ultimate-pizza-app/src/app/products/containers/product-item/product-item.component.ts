import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { Pizza, Topping } from '../../models';
import { PizzasService, ToppingsService } from '../../services';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  pizza: Pizza;
  visualise: Pizza;
  toppings: Topping[];

  constructor(
    private pizzaService: PizzasService,
    private toppingsService: ToppingsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.pizzaService.getPizzas()
      .pipe(take(1))
      .subscribe(pizzas => {
        const param = this.route.snapshot.params.id;
        let pizza: Pizza;
        if (param === 'new') {
          pizza = {};
        } else {
          pizza = pizzas.find(pizza => pizza.id == parseInt(param, 10));
        }
        this.pizza = pizza;
        this.toppingsService.getToppings().subscribe(toppings => {
          this.toppings = toppings;
          this.onSelect(toppings.map(topping => topping.id));
        });
    });
  }

  onSelect(event: number[]) {
    let toppings: Topping[];
    if (this.toppings && this.toppings.length) {
      toppings = event.map(id =>
        this.toppings.find(topping => topping.id === id)
      );
    } else {
      toppings = this.pizza.toppings;
    }
    this.visualise = { ...this.pizza, toppings };
  }

  onCreate(event: Pizza) {
    this.pizzaService.createPizza(event)
      .pipe(take(1))
      .subscribe(pizza => {
        this.router.navigate([`/products/${pizza.id}`]);

      });
  }

  onUpdate(event: Pizza) {
    this.pizzaService.updatePizza(event)
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate([`/products`]);
      });
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.pizzaService.removePizza(event)
        .pipe(take(1))
        .subscribe(() => {
          this.router.navigate([`/products`]);
        });
    }
  }

}
