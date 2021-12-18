import { Component, Input } from '@angular/core';
import { Tutor } from '../../models';


@Component({
  selector: 'tutor-card',
  templateUrl: './tutor-card.component.html',
  styleUrls: ['./tutor-card.component.scss']
})
export class TutorCardComponent {	
	@Input() tutor: Tutor;

    constructor() { }
}
