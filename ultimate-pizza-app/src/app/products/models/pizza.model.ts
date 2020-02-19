import { Topping } from './topings.model';

export interface Pizza {
  id?: number;
  name?: string;
  toppings?: Topping[];
}
