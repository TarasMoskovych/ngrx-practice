import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Pizza } from 'src/app/products/models';
import { DROP_ANIMATION } from '../../animations';

@Component({
  animations: [DROP_ANIMATION],
  selector: 'app-pizza-display',
  templateUrl: './pizza-display.component.html',
  styleUrls: ['./pizza-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaDisplayComponent {
  @Input() pizza: Pizza;
}
