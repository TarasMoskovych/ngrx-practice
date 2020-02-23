import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, PizzasEffects } from './../+store';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductItemComponent, ProductsComponent } from './containers';
import { PizzaDisplayComponent, PizzaFormComponent, PizzaItemComponent, PizzaToppingsComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    StoreModule.forFeature('products', reducers),
    EffectsModule.forFeature([PizzasEffects]),
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
