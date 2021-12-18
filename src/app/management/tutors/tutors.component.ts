import { Component, OnInit } from '@angular/core';
import { CardData } from 'src/app/shared/models';
import { Tutor } from '../models';


@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.scss']
})
export class TutorsComponent implements OnInit {
	cards: CardData[];
	tutors: Tutor[];

	constructor() {
		this.cards = [
			{
				title: 'Verified',
				value: 100,
				icon: 'students',
				class: 'verified'
			},
			{
				title: 'Pending',
				value: 100,
				icon: 'students',
				class: 'pending'
			},
			{
				title: 'Declined',
				value: 12,
				icon: 'students',
				class: 'decline'
			}
		];

		this.tutors = [
			{
				name: 'Tutor 1',
				image: null,
				phone_number: '0343-9090902',
				email: 'tutor@gmail.com'
			},
			{
				name: 'Tutor 2',
				image: null,
				phone_number: '0343-9090912',
				email: 'tutor@gmail.com'
			},
			{
				name: 'Tutor 3',
				image: null,
				phone_number: '0343-9090922',
				email: 'tutor@gmail.com'
			},
			{
				name: 'Tutor 4',
				image: null,
				phone_number: '0343-9090932',
				email: 'tutor@gmail.com'
			}
		]
	}

	ngOnInit(): void {
	}
}