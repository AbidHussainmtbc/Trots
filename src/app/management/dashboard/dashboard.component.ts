import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
<<<<<<< HEAD
import { dashboardSubject, tutorCounter } from 'src/app/Classes/management';
import { Student } from 'src/app/Classes/student';
=======
import { CardData } from 'src/app/shared/models';
>>>>>>> 5750190aaa7b28c3ce61e7bab4d3a2d5a37b2d63
import { ApiServiceService } from '../../services/api-service.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardCards: CardData[];

  objtutorCounter :tutorCounter;
  lstStudent:Student[];
  PietutorCounter:tutorCounter;
  lstdashboardSubject: dashboardSubject[];
  objdashboardSubject: dashboardSubject;
  chartOptions = {
    legend: {display: false}
  }
  status : any;
  tutors :any;
  // students = [
  //   {image: 'assets/images/user-image.png', id: '123123', class: '8th', name: 'Floyd Miles'},
  //   {image: 'assets/images/user-image.png', id: '123123', class: '8th', name: 'Floyd Miles'},
  //   {image: 'assets/images/user-image.png', id: '123123', class: '8th', name: 'Floyd Miles'},
  //   {image: 'assets/images/user-image.png', id: '123123', class: '8th', name: 'Floyd Miles'},
  //   {image: 'assets/images/user-image.png', id: '123123', class: '8th', name: 'Floyd Miles'},
  //   {image: 'assets/images/user-image.png', id: '123123', class: '8th', name: 'Floyd Miles'},
  //   {image: 'assets/images/user-image.png', id: '123123', class: '8th', name: 'Floyd Miles'},
  //   {image: 'assets/images/user-image.png', id: '123123', class: '8th', name: 'Floyd Miles'},
  //   {image: 'assets/images/user-image.png', id: '123123', class: '8th', name: 'Floyd Miles'},
  //   {image: 'assets/images/user-image.png', id: '123123', class: '8th', name: 'Floyd Miles'},
  //   {image: 'assets/images/user-image.png', id: '123123', class: '8th', name: 'Floyd Miles'},
  //   {image: 'assets/images/user-image.png', id: '123123', class: '8th', name: 'Floyd Miles'}
  // ];
  subscriptions: Subscription[] = [];
  isLoading = false;
  subjects = [];

  constructor(
    private apiService: ApiServiceService,
<<<<<<< HEAD
    private toastService: ToastService
  ) {
    this.objtutorCounter  = new tutorCounter();
    this.lstStudent = [];
    this.PietutorCounter = new tutorCounter();
  }
=======
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
>>>>>>> 5750190aaa7b28c3ce61e7bab4d3a2d5a37b2d63

  ngOnInit(): void {
    this.getDetails();
    this.getrecentstudents();
    this.getDashboardsubjects();
    this.Dashboardtutors();
    this.Dashboardstatus();
  }
  getrecentstudents(){
    // var tutorid = '1';
     debugger;
     this.apiService.GetDetails("Dashboard/recentstudents").subscribe(rtnData => {
       debugger;

       if (rtnData.message == "success") {
        console.log("Response tutors");
         console.log(rtnData);
         this.lstStudent=rtnData.result;
       }  else {
        this.toastService.error(rtnData.message);
      }
    },error =>{
       debugger;
      this.toastService.error("Error in API Connectivity");
    });
   }
   
   getDashboardsubjects(){
    // var tutorid = '1';
     debugger;
     this.apiService.GetDetails("Dashboard/subjects").subscribe(rtnData => {
       debugger;

       if (rtnData.message == "success") {
        console.log("Response tutors");
         console.log(rtnData);
         this.lstdashboardSubject=rtnData.result;
       }  else {
        this.toastService.error(rtnData.message);
      }
    },error =>{
       debugger;
      this.toastService.error("Error in API Connectivity");
    });
   }

   getDetails(){
   // var tutorid = '1';
    debugger;
    this.apiService.GetDetails("Dashboard/totalsummary").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      
      if (rtnData.message == "Success") {
        console.log(rtnData);
        this.objtutorCounter=rtnData.result; 
      } else {
  
      }
    });
   }
   Dashboardstatus(){
     //
     debugger;
     var path = "Dashboard/status?filter="+"Month";
     this.apiService.GetDetails(path).subscribe(rtnData => {
       debugger;
       console.log('rtnData', rtnData);
       
       if (rtnData.message == "Success") {
         console.log(rtnData);
         this.objtutorCounter=rtnData.result; 

         this.status = {
          labels: ['Eng', 'Bio', 'Math', 'Phy', 'Che'],
          datasets: [
            {
              label: '',
              backgroundColor: '#42A5F5',
              data: [20, 40, 60, 20, 70]
            }
          ]
        };
       } else {
   
       }
     });
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

   Dashboardtutors(){
    debugger;
    this.apiService.GetDetails("Dashboard/tutors").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      
      if (rtnData.message == "Success") {
        console.log(rtnData);
        this.PietutorCounter=rtnData.result;
        this.PietutorCounter.declinedusers = this.PietutorCounter.declinedusers+ 2;
        this.PietutorCounter.pendingusers = this.PietutorCounter.pendingusers +4; 
        this.PietutorCounter.verfiedusers = this.PietutorCounter.verfiedusers + 6 ;
        this.tutors = {
          labels: ['Declined', 'Pending', 'Verified'],
          datasets: [
            {
              backgroundColor: ['#CD3621', '#F46E23', '#28B446'],
              labels: ['Declined', 'Pending',  'Verified'],
              data: [this.PietutorCounter.declinedusers, this.PietutorCounter.pendingusers,this.PietutorCounter.verfiedusers ]
            }
          ]
        };
        // this.tutors.datasets[0].data = [];
        // this.tutors.datasets[0].data.push(0)
        // this.tutors.datasets[0].data.push(2)
        // this.tutors.datasets[0].data.push(5)
        
      } else {
        this.toastService.error("Error");
      }
    }); 
   }

}
