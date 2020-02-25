import { PizzasEffects } from './pizzas.effect';
import { ToppingsEffects } from './toppings.effect';

export * from './pizzas.effect';
export * from './toppings.effect';

export const productsEffects = [PizzasEffects, ToppingsEffects];
