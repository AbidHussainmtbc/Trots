import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CardData } from 'src/app/shared/models';
import { ApiServiceService } from '../../services/api-service.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardCards: CardData[];

  status = {
    labels: ['Eng', 'Bio', 'Math', 'Phy', 'Che'],
    datasets: [
      {
        label: '',
        backgroundColor: '#42A5F5',
        data: [20, 40, 60, 20, 70]
      }
    ]
  };
  tutors = {
    datasets: [
      {
        backgroundColor: ['#CD3621', '#F46E23', '#28B446'],
        data: [20, 40, 60]
      }
    ]
  };
  students = [
    {image: 'assets/images/user-image.png', id: '123123', class: '8th', name: 'Floyd Miles'},
    {image: 'assets/images/user-image.png', id: '123123', class: '8th', name: 'Floyd Miles'},
    {image: 'assets/images/user-image.png', id: '123123', class: '8th', name: 'Floyd Miles'},
    {image: 'assets/images/user-image.png', id: '123123', class: '8th', name: 'Floyd Miles'},
    {image: 'assets/images/user-image.png', id: '123123', class: '8th', name: 'Floyd Miles'},
    {image: 'assets/images/user-image.png', id: '123123', class: '8th', name: 'Floyd Miles'},
    {image: 'assets/images/user-image.png', id: '123123', class: '8th', name: 'Floyd Miles'},
    {image: 'assets/images/user-image.png', id: '123123', class: '8th', name: 'Floyd Miles'},
    {image: 'assets/images/user-image.png', id: '123123', class: '8th', name: 'Floyd Miles'},
    {image: 'assets/images/user-image.png', id: '123123', class: '8th', name: 'Floyd Miles'},
    {image: 'assets/images/user-image.png', id: '123123', class: '8th', name: 'Floyd Miles'},
    {image: 'assets/images/user-image.png', id: '123123', class: '8th', name: 'Floyd Miles'}
  ];
  subscriptions: Subscription[] = [];
  isLoading = false;
  subjects = [];

  constructor(
    private apiService: ApiServiceService,
    private toastService: ToastService)
    {
      this.dashboardCards = [
        {
          title: 'Total Students',
          value: 100,
          icon: 'students'
        },
        {
          title: 'Total Tutors',
          value: 100,
          icon: 'tutors'
        },
        {
          title: 'Total Subjects',
          value: 100,
          icon: 'subject'
        }
      ]
    }

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects(): void {
    this.isLoading = true;

    this.subscriptions.push(
      this.apiService.getAllSubjects().subscribe(data => {
        this.isLoading = false;
        if (data && data.result) {
          this.subjects = data.result;
        }
      }, error => {
        this.isLoading = false;
        this.toastService.error(error);
      })
    );
  }

}
