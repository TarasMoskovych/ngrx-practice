import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductItemComponent, ProductsComponent } from './containers';
import { PizzaDisplayComponent, PizzaFormComponent, PizzaItemComponent, PizzaToppingsComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductsRoutingModule
  ],
  declarations: [
    ProductItemComponent,
    ProductsComponent,
    PizzaDisplayComponent,
    PizzaFormComponent,
    PizzaItemComponent,
    PizzaToppingsComponent
  ],
  exports: [
    ProductItemComponent,
    ProductsComponent,
    PizzaDisplayComponent,
    PizzaFormComponent,
    PizzaItemComponent,
    PizzaToppingsComponent
  ]
})
export class ProductsModule { }
