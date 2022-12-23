import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bookings, CorpStudent, CorpTutor, report } from 'src/app/Classes/corporate';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-schedule-logs',
  templateUrl: './schedule-logs.component.html',
  styleUrls: ['./schedule-logs.component.scss']
})
export class ScheduleLogsComponent implements OnInit {

  objCorpTutor:CorpTutor;
  lstCorpTutor:CorpTutor[];

  objCorpStudent : CorpStudent;
  lstCorpStudent : CorpStudent[]
  isStudent:boolean  =false;


  lstreport:report[];
  lstreport_byid:report[];
  lstBookings: Bookings[];
  Temp_lstBookings: Bookings[];
  PageNo: number = 1
  Pagesize: number = 10;
  display = "none";
  constructor(private modalService: NgbModal,private apiService: ApiServiceService, private toastService: ToastService) { 
    this.objCorpStudent = new  CorpStudent();
    this.lstCorpStudent  = []

    this.objCorpTutor = new CorpTutor();
    this.lstCorpTutor = [];
    this.Temp_lstBookings = [];
    this.lstBookings = [];
    this.lstreport = [];
    this.lstreport_byid=[];
  }

  ngOnInit(): void {
    // this.getStudent();
    // this.gettutor();
    this.getbookings();
    this.activityreport();
  }

  // Corporate/scheduleclasses/active/viewclass
  
  getStudent() {

    debugger;
    var corporateAccId  = sessionStorage.getItem("corporateAccId")
    this.apiService.GetDetails("Corporate/students?corporateAccId="+corporateAccId).subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);

      if (rtnData.message == "Success") {
        this.lstCorpStudent = rtnData.result;
      } else {
        this.toastService.error("Error");
      }
    });
  }

  gettutor() {
    debugger;
    var corporateAccId  = sessionStorage.getItem("corporateAccId")
    this.apiService.GetDetails("Corporate/tutors?corporateAccId="+corporateAccId).subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      if (rtnData.message == "Success") {
         this.lstCorpTutor = rtnData.result;
      } else {
        this.toastService.error("Error");
      }
    });
  }

  // /Corporate/scheduleclasses/active/viewclass
  // Corporate/scheduleclasses/active/activityreport


  
  activityreport(){
    debugger;
    var corporateAccId  = sessionStorage.getItem("corporateAccId")
    this.apiService.GetDetails("Corporate/activityreport?corporateAccId="+corporateAccId+"&sessionId="+0+"&all="+true+"&pageNumber="+1+"&pageSize="+10).subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      if (rtnData.message == "success" || rtnData.message == "Success") {
         this.lstreport = rtnData.result;
      } else {
        this.toastService.error("Error");
      }
    });
  }


  activityreport_byid(id:any){
    debugger;
    var corporateAccId  = sessionStorage.getItem("corporateAccId")
    this.apiService.GetDetails("Corporate/activityreport?corporateAccId="+corporateAccId+"&sessionId="+id+"&all="+true+"&pageNumber="+1+"&pageSize="+10).subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      if (rtnData.message == "success" || rtnData.message == "Success") {
         this.lstreport_byid = rtnData.result;
      } else {
        this.toastService.error("Error");
      }
    });
  }  
  getbookings() {
    debugger;
    this.PageNo = 1
    var date = new Date().toISOString()
    var corporateAccId = sessionStorage.getItem("corporateAccId")

    // Corporate/bookings?corporateAccId=3&subjectId=3&pageNumber=1&pageSize=2
    this.apiService.GetDetails("Corporate/bookings?corporateAccId=" + corporateAccId + "&subjectId=" + 0 + "&pageNumber=" + 1 + "&pageSize=" + 10).subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);

      if (rtnData.message == "success" || rtnData.message == "Success" || rtnData.haserror == false) {
        this.toastService.success(rtnData.message);
        this.lstBookings = rtnData.result;
        if (this.lstBookings != null) {
                 var  startindex = (this.PageNo * this.Pagesize) - this.Pagesize;
          this.Temp_lstBookings = this.lstBookings.slice(startindex, startindex + this.Pagesize)
        }
      } else {
        this.toastService.error("Error");
      }
    });

  }

  Next(pageNo: any) {
    if (pageNo == "") {
      this.PageNo = this.PageNo + 1;
             var  startindex = (this.PageNo * this.Pagesize) - this.Pagesize;
      this.Temp_lstBookings = this.lstBookings.slice(startindex, startindex + this.Pagesize)
    }
    else {
      this.PageNo = pageNo;
             var  startindex = (this.PageNo * this.Pagesize) - this.Pagesize;
      this.Temp_lstBookings = this.lstBookings.slice(startindex, startindex + this.Pagesize)
    }

  }
  Previous() {
    if (this.PageNo != 1) {
      this.PageNo = this.PageNo - 1;
             var  startindex = (this.PageNo * this.Pagesize) - this.Pagesize;
      this.Temp_lstBookings = this.lstBookings.slice(startindex, startindex + this.Pagesize)
    }

  }


  openModal(id:any) {
    debugger;
    this.activityreport_byid(id)
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
}
