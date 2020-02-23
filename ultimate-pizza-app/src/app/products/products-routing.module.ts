import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductItemComponent, ProductsComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'new',
    component: ProductItemComponent,
  },
  {
    path: ':productId',
    component: ProductItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
