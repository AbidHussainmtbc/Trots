import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bookings, corpSubject, CorpTutor } from 'src/app/Classes/corporate';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastService } from 'src/app/services/toast.service';
import { SubjectModelComponent } from '../subject-model/subject-model.component';

@Component({
  selector: 'app-corporate-teachers',
  templateUrl: './corporate-teachers.component.html',
  styleUrls: ['./corporate-teachers.component.scss']
})
export class CorporateTeachersComponent implements OnInit {

  lstcorpSubject: corpSubject
  corpSubject: corpSubject[]
  lstBookings: Bookings[];
  Temp_lstBookings: Bookings[];
  PageNo: number = 1
  Pagesize: number = 10;
  selectedSubjectID : number = 0;

  constructor(private modalService: NgbModal,
    private apiService: ApiServiceService,
    private toastService: ToastService
  ) {
    this.Temp_lstBookings = [];
    this.lstBookings = [];
    this.lstcorpSubject = new corpSubject()
    this.corpSubject = []
  }

  ngOnInit(): void {
    this.getbookings();
  }


  open() {
    const modalRef = this.modalService.open(SubjectModelComponent);
    modalRef.componentInstance.name = 'World';
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      console.log(receivedEntry);

      this.selectedSubjectID = receivedEntry
      this.getbookings();
      // this.objcreatebooking.studentIds= receivedEntry;
    })
  }

  ///Corporate/tutors
  // gettutor() {

  //   debugger;
  //   var corporateAccId  =sessionStorage.getItem("corporateAccId")
  //   this.apiService.GetDetails("Corporate/tutors?corporateAccId="+corporateAccId).subscribe(rtnData => {
  //     debugger;
  //     console.log('rtnData', rtnData);

  //     if (rtnData.message == "Success") {
  //        this.lstCorpTutor = rtnData.result;
  //     } else {
  //       this.toastService.error("Error");
  //     }
  //   });

  // }




  // getSubject() {
  //   debugger;
  //   var date = new Date().toISOString()
  //   var corporateAccId = sessionStorage.getItem("corporateAccId")
  //   this.apiService.GetDetails("Corporate/subjects?corporateAccId=" + corporateAccId).subscribe(rtnData => {
  //     debugger;
  //     console.log('rtnData', rtnData);

  //     if (rtnData.message == "success" || rtnData.message == "Success" || rtnData.haserror == false) {

  //       this.toastService.success(rtnData.message);
  //       this.lstcorpSubject = rtnData.result;
  //     } else {
  //       this.toastService.error("Error");
  //     }
  //   });

  // }

  getbookings() {
    debugger;
    this.PageNo = 1
    var date = new Date().toISOString()
    var corporateAccId = sessionStorage.getItem("corporateAccId")

    // Corporate/bookings?corporateAccId=3&subjectId=3&pageNumber=1&pageSize=2
    this.apiService.GetDetails("Corporate/bookings?corporateAccId=" + corporateAccId + "&subjectId=" + this.selectedSubjectID + "&pageNumber=" + 1 + "&pageSize=" + 10).subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);

      if (rtnData.message == "success" || rtnData.message == "Success" || rtnData.haserror == false) {
        this.toastService.success(rtnData.message);
        this.lstBookings = rtnData.result;
        this.Temp_lstBookings =[];
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
}
