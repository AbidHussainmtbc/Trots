import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Chart from 'chart.js';
import { classesdetails, completeProfile, subjects, tutorCounter } from 'src/app/Classes/management';
import { tutorList } from 'src/app/Classes/tutor';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastService } from 'src/app/services/toast.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CardData } from 'src/app/shared/models';
import { Tutor } from '../models';


@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.scss']
})
export class TutorsComponent implements OnInit {
  canvas: any;
ctx: any;
showProfile: boolean =false;
objtutorCounter :tutorCounter;
lsttutorList :tutorList[];
completeProfile: completeProfile;
classesdetails :classesdetails[];
objsubjects: subjects;
subjects :subjects[]
One :boolean = true;
two :boolean = true;
Three :boolean = true;
selectedSub:string= "";
objupdatetutor:updatetutor;
selectID : number=0;
pageNo: number = 1;
pageSize: number = 2000;
totalPage: number = 0;
p: number = 1;

items = [];
pageOfItems: Array<any>;
constructor( private router: Router, private toastService: ToastService,
  private utilsService: UtilsService, private apiService: ApiServiceService) {
    this.objtutorCounter  = new tutorCounter();
    this.lsttutorList =[];
    this.showProfile =false;
    this.completeProfile =new completeProfile();
    this.classesdetails  = [];
    this.subjects = [];
this.objsubjects =new subjects();
this.objupdatetutor = new updatetutor();   
}

  ngOnInit(): void {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
  const myChart = new Chart(this.ctx, {
  type: 'bar',
  data: {
  labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June' , 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{
  label: 'Total cases.',
  data: [100, 90, 75, 88, 60,95,50,60,90,88,52,0],
  backgroundColor: ['Blue','Blue' ,'Blue' ,'Blue' ,'Blue' , 'Blue','Blue' ,'Blue' ,'Blue','Blue','Blue','Blue'],
  borderWidth: 1
  }]
  },
  options: {
  legend: {
  display: false
  },
  responsive: false,
  display: true
  }
  });
  this.TutorDashboard_GetTutors();
  this.gettutors();
  this.TutorDashboardstatus();
}

TutorDashboard_GetTutors(){
 // var tutorid = '1';
  debugger;
  // this.apiService.noParam_GetDetails_pagination("TutorDashboard/GetTutors","pageNo","pageSize",this.pageNo ,this.pageSize).subscribe(rtnData => {
    this.apiService.GetDetails("TutorDashboard/GetTutors?pageSize="+this.pageSize +"&pageNo="+this.pageNo).subscribe(rtnData => {
  debugger;
    console.log('rtnData', rtnData);
    
    if (rtnData.message == "Success") {
      console.log("Response totalsummary");
      console.log(rtnData);
      this.lsttutorList=rtnData.result.tutors;

      this.totalPage = rtnData.result.totalpages;
    } else {
      this.toastService.error(rtnData.message);
    }
  },error =>{
     debugger;
    this.toastService.error("Error in API Connectivity");
  });
}

collapseOne(){
  this.One = !this.One;
}
collapsetwo(){
  this.two = !this.two;
}
collapseThree(){
  this.Three = !this.Three;
}

Cancel(){
  this.selectID =0;
  this.showProfile = false;
}
showUserProfile(id:any){
//  alert(id)
  this.selectID = id;
  this.apiService.get_noPagination(id, "id", "TutorDashboard/TutorProfile").subscribe(rtnData => {
    debugger;
    console.log('rtnData', rtnData);
    
    if (rtnData.message == "Success") {
     console.log("Response TutorProfile");
      console.log(rtnData);
      this.completeProfile=rtnData.result;

      for(var x = 0 ; x<this.completeProfile.subjects.length ; x++){
        if(this.completeProfile.subjects[x].testPercentage == 0){
          this.completeProfile.subjects[x].ctgry ="p0"
        }
        else if(this.completeProfile.subjects[x].testPercentage == 100){
          this.completeProfile.subjects[x].ctgry ="p100"
        }
        else if(this.completeProfile.subjects[x].testPercentage < 33){
          this.completeProfile.subjects[x].ctgry ="p33"
        }
        else if(this.completeProfile.subjects[x].testPercentage >= 34 && this.completeProfile.subjects[x].testPercentage < 66){
          this.completeProfile.subjects[x].ctgry ="p66"
        }
        else if(this.completeProfile.subjects[x].testPercentage >= 66 && this.completeProfile.subjects[x].testPercentage < 90){
          this.completeProfile.subjects[x].ctgry ="p90"
        }

      }
      this.objsubjects = this.completeProfile.subjects[0];
     
    }  else {
      this.toastService.error(rtnData.message);
    }
  },error =>{ 
     debugger;
    this.toastService.error("Error in API Connectivity");
  });
  this.showProfile = true;
}
gettutors(){
  // var tutorid = '1';
   debugger;
   this.apiService.GetDetails("Dashboard/tutors").subscribe(rtnData => {
     debugger;
     console.log('rtnData', rtnData);
     
     if (rtnData.message == "Success") {
      console.log("Response tutors");
       console.log(rtnData);
       this.objtutorCounter=rtnData.result;
     }  else {
      this.toastService.error(rtnData.message);
    }
  },error =>{
     debugger;
    this.toastService.error("Error in API Connectivity");
  });
 }

 TutorDashboardstatus(){
  // var tutorid = '1';
   debugger;
   this.apiService.GetDetails("TutorDashboard/status").subscribe(rtnData => {
     debugger;
     console.log('rtnData', rtnData);
     
     if (rtnData.message == "Success") {
      console.log("Response tutors");
       console.log(rtnData);
       this.objtutorCounter=rtnData.result;
     }  else {
      this.toastService.error(rtnData.message);
    }
  },error =>{
     debugger;
    this.toastService.error("Error in API Connectivity");
  });
 }
 viewFile(url:any){
  console.log(location.origin);
    window.open(location.origin+"/"+url, "_blank");
 }
 ///Tutor/updatetutorstatus
 updatetutorstatus(str:any , ID :number){
  // var tutorid = '1';
   debugger;
if(str== "Accept"){
  this.objupdatetutor.isapproved = true;
  this.objupdatetutor.isrejected= false;
}
else {
  this.objupdatetutor.isapproved = false;
  this.objupdatetutor.isrejected= true;
}

if(ID ==0){
  this.objupdatetutor.userid = this.selectID;
  this.objupdatetutor.subjectid  = 0 ;
} 
else{
  this.objupdatetutor.userid = ID;
  this.objupdatetutor.subjectid  = 0;
}
var token = sessionStorage.getItem("token");
this.objupdatetutor.authtoken =   token;
// Subject/updatetutorsubjectstatus
  //  this.apiService.put(this.objupdatetutor ,"Tutor/updatetutorstatus").subscribe(rtnData => {
    this.apiService.put(this.objupdatetutor ,"Subject/updatetutorsubjectstatus").subscribe(rtnData => {
  debugger;
     console.log('rtnData', rtnData);
     
     if (rtnData.message == "Success") {
      this.toastService.success("Updated");
      this.Cancel();
      this.TutorDashboard_GetTutors();
      this.gettutors();
    } else {
      this.toastService.error(rtnData.message);
     }
   },
   Error => {
     debugger;
    this.toastService.error("Error in API Connectivity");
   }
   );
 }
//  onChange(){
//    alert(this.selectedSub)
//  }
onChangePage(pageOfItems: Array<any>) {
  // update current page of items
  this.pageOfItems = pageOfItems;
}
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

}


export class updatetutor{
  authtoken  : string;
  userid  : number;
  subjectid  : number;
  isapproved  : boolean;
  isrejected  : boolean;

  /**
   *
   */
  constructor() {
    this.authtoken ="";
    this.userid =0 ;
    this.isapproved =false;
    this.isrejected =false;

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
	cards: CardData[];
	tutors: Tutor[];

	ngOnInit(): void {
	}
}