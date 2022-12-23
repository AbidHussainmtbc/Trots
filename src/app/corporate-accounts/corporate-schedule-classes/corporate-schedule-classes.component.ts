import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bookings, corpSubject, CorpTutor, createbooking, subjectResp, ViewDeleteStudent } from 'src/app/Classes/corporate';
import { subjectswithcategories } from 'src/app/Classes/management';
import { searchOnsiteTutor } from 'src/app/Classes/student';
import { Categorylist } from 'src/app/Classes/tutor';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastService } from 'src/app/services/toast.service';
import { ScheduleClassesModalComponent } from '../schedule-classes-modal/schedule-classes-modal.component';

@Component({
  selector: 'app-corporate-schedule-classes',
  templateUrl: './corporate-schedule-classes.component.html',
  styleUrls: ['./corporate-schedule-classes.component.scss']
})
export class CorporateScheduleClassesComponent implements OnInit {

  // constructor(ScheduleClassesModalComponent) { }
  objCorpTutor:CorpTutor;
  lstCorpTutor:CorpTutor[];
  showClassSchedule: boolean = false;
  subjectswithcategories: subjectswithcategories[];
  searchOnsiteTutor: searchOnsiteTutor;
  isOnsite: boolean = false;
  subjectName: string = "";
  selGenCategory;
  selSubCategory;
  selectedindex: number = 0;
  value: Date;
  objcreatebooking: createbooking;
  lstsubjectResp:subjectResp[];
  selectedTime: string ="";
  public objViewDeleteStudent: ViewDeleteStudent;
  lstBookings: Bookings[];
  lstActiveBookings: Bookings[];
  lstUpcommingBookings: Bookings[];
  Temp_lstUpcommingBookings: Bookings[];
  display = "none";
  PageNo : number = 1
  Pagesize : number = 10;
  
  maxDate:Date;
  minDate:Date;

  constructor(private apiService: ApiServiceService, private router: Router,
    private toastService: ToastService,
    private modalService: NgbModal) {
    this.subjectswithcategories = [];
    this.searchOnsiteTutor = new searchOnsiteTutor();
    this.selGenCategory = null;
    this.selSubCategory = null;
    this.objViewDeleteStudent = new ViewDeleteStudent();
    this.objcreatebooking = new createbooking();
    this.value = new Date();
    this.lstsubjectResp = [];
    this.objCorpTutor = new CorpTutor();
    this.lstCorpTutor = [];
    this.lstBookings = [];
    this.lstUpcommingBookings = [];
    this.Temp_lstUpcommingBookings = [];
    this.lstActiveBookings = [];
  }

  subjects: Categorylist[];
  ngOnInit(): void {
    this.getsubjects();
    this.gettutor();
    this.scheduleclassesupcoming();
    this.scheduleclasses_active();  
  }


  gettutor() {

    debugger;
    var corporateAccId  =sessionStorage.getItem("corporateAccId")
    this.lstCorpTutor=[]
    this.apiService.GetDetails("Corporate/tutors?corporateAccId="+corporateAccId+"&subjectId="+this.objcreatebooking.subjectId).subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);

      if (rtnData.haserror == false) {
         this.lstCorpTutor = rtnData.result;
      } else {
        this.toastService.error("Error");
      }
    });

  }
  open() {
    this.showClassSchedule = true;
  }

  addStd() {
    debugger;
    this.objViewDeleteStudent.isView = false;
    this.objViewDeleteStudent.stdID = this.objcreatebooking.studentIds;

    const modalRef = this.modalService.open(ScheduleClassesModalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.user = this.objViewDeleteStudent;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
        console.log(receivedEntry);
        this.objcreatebooking.studentIds= receivedEntry;
      })
  }

  viewStd() {
    debugger;
    this.objViewDeleteStudent.isView = true;
    this.objcreatebooking.studentIds = "1139"
    this.objViewDeleteStudent.stdID = this.objcreatebooking.studentIds;

    const modalRef = this.modalService.open(ScheduleClassesModalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.user = this.objViewDeleteStudent;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      console.log(receivedEntry);
      this.objcreatebooking.studentIds= receivedEntry;
    });

  }

  createbooking() {
    debugger;
    this.objcreatebooking.startDate = this.value;
    this.objcreatebooking.noOfClasses = 1;
    var corporateAccId = sessionStorage.getItem("corporateAccId")
    this.objcreatebooking.corporateAccId = Number(corporateAccId);
    var token = sessionStorage.getItem("token");
    this.objcreatebooking.authtoken = token
    this.apiService.post(this.objcreatebooking, "Corporate/createbooking").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      
      if (rtnData.message == "Success") {
        this.toastService.success("Saved Successfully..!");
      } else {
        this.toastService.error("Error");
      }
    });


  }

  timeSeleted(atr: any){
    debugger;
    this.selectedTime = atr;
    var temp = atr.split('-')
    this.objcreatebooking.timeFrom = temp[0]
    this.objcreatebooking.timeTo= temp[1]
  }
  //Corporate/subjects

  getsubjects() {
    debugger;
    var corporateAccId = sessionStorage.getItem("corporateAccId")
    this.apiService.GetDetails("Corporate/subjects?corporateAccId=" + corporateAccId).subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);

      if (rtnData.message == "success") {
         this.lstsubjectResp = rtnData.result;
      } else {
        this.toastService.error("Error");
      }
    });
  }

  // /Corporate/scheduleclasses/active

  scheduleclasses_active() {
    debugger;
    var corporateAccId = sessionStorage.getItem("corporateAccId")
    // this.value.toISOString()
    this.apiService.GetDetails("Corporate/scheduleclasses/active?corporateAccId=" + corporateAccId + "&currentDate=" + '12/03/2022').subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);

      if (rtnData.message == "Success" || rtnData.message == "success") {
        this.lstActiveBookings = rtnData.result;


      } else {
        this.toastService.error(rtnData.message);
      }
    });
  }

  viewclass(id:any) {

    debugger;
    var corporateAccId  = sessionStorage.getItem("corporateAccId")
    this.apiService.GetDetails("Corporate/scheduleclasses/active/viewclass?corporateAccId="+corporateAccId+"&sessionId="+id).subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);

      if (rtnData.message == "Success") {
        this.toastService.error("No reord found");
        // this.lstCorpStudent = rtnData.result;
      } else {
        this.toastService.error("Error");
      }
    });
  }


  scheduleclassesupcoming() {
    var date = new Date().toISOString()
    var corporateAccId = sessionStorage.getItem("corporateAccId")
    this.apiService.GetDetails("Corporate/scheduleclasses/upcoming?corporateAccId=" + corporateAccId + "&currentDate=" + date + "&pageNumber=" + 1 + "&pageSize=" + 10).subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);

      if (rtnData.message == "success" || rtnData.message == "Success") {
         this.lstUpcommingBookings = rtnData.result;

         this.Temp_lstUpcommingBookings = this.lstUpcommingBookings.slice(this.PageNo , this.PageNo+ this.Pagesize)
      } else {
        this.toastService.error("Error");
      }
    });
  }

  Next(pageNo:any){
    if(pageNo ==""){
      this.PageNo = this.PageNo+1;
             var  startindex = (this.PageNo * this.Pagesize) - this.Pagesize;
      this.Temp_lstUpcommingBookings = this.lstUpcommingBookings.slice(startindex , startindex+ this.Pagesize)
    }
    else {
      this.PageNo = pageNo;
             var  startindex = (this.PageNo * this.Pagesize) - this.Pagesize;
      this.Temp_lstUpcommingBookings = this.lstUpcommingBookings.slice(startindex , startindex+ this.Pagesize)
    }

  }
  Previous(){
    if(this.PageNo !=1){
      this.PageNo = this.PageNo-1;
             var  startindex = (this.PageNo * this.Pagesize) - this.Pagesize;
      this.Temp_lstUpcommingBookings = this.lstUpcommingBookings.slice(startindex, startindex+ this.Pagesize)
    }

  }

  Active_Next(pageNo:any){
    if(pageNo ==""){
      this.PageNo = this.PageNo+1;
             var  startindex = (this.PageNo * this.Pagesize) - this.Pagesize;
      this.Temp_lstUpcommingBookings = this.lstUpcommingBookings.slice(startindex , startindex+ this.Pagesize)
    }
    else {
      this.PageNo = pageNo;
             var  startindex = (this.PageNo * this.Pagesize) - this.Pagesize;
      this.Temp_lstUpcommingBookings = this.lstUpcommingBookings.slice(startindex , startindex+ this.Pagesize)
    }

  }

  Active_Previous(){
    if(this.PageNo !=1){
      this.PageNo = this.PageNo-1;
      this.Temp_lstUpcommingBookings = this.lstUpcommingBookings.slice(this.PageNo , this.PageNo+ this.Pagesize)
    }

  }
  

  view_activityreport() {
    var date = new Date().toISOString()
    var corporateAccId = sessionStorage.getItem("corporateAccId")

    this.apiService.GetDetails("Corporate/activityreport?corporateAccId=" + corporateAccId + "&sessionId=" + 12 + "&all=" + true + "&pageNumber=" + 1 + "&pageSize=" + 10).subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);

      if (rtnData.message == "Success") {
        // this.lstCorpStudent = rtnData.result;
      } else {
        this.toastService.error("Error");
      }
    });
  }

  close() {
    this.showClassSchedule = false;
    // const modalRef = this.modalService.open(ScheduleClassesModalComponent , { size: 'lg', backdrop: 'static' });
    // modalRef.componentInstance.name = 'World';
  }


  
  openModal(id:any) {
    debugger;
    // this.viewclass(id)
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
}


