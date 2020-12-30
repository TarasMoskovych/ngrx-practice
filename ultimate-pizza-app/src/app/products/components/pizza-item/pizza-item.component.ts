import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Pizza } from '../../models';

@Component({
  selector: 'app-pizza-item',
  templateUrl: './pizza-item.component.html',
  styleUrls: ['./pizza-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaItemComponent {
  @Input() pizza: Pizza;
}
