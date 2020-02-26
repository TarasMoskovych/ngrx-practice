import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductItemComponent, ProductsComponent } from './containers';
import { PizzasGuard, PizzaExistsGuard, ToppingsGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    canActivate: [PizzasGuard],
  },
  {
    path: 'new',
    component: ProductItemComponent,
    canActivate: [PizzasGuard, ToppingsGuard],
  },
  {
    path: ':productId',
    component: ProductItemComponent,
    canActivate: [PizzaExistsGuard, ToppingsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
