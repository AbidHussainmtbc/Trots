import { Component, Input } from '@angular/core';
import { CardData } from '../../models';


@Component({
  selector: 'dashboard-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
	@Input() data: CardData;
	
    constructor() { }
}
