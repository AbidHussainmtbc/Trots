import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { dashboard_corp } from 'src/app/Classes/corporate';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastService } from 'src/app/services/toast.service';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-corporate-dashboard',
  templateUrl: './corporate-dashboard.component.html',
  styleUrls: ['./corporate-dashboard.component.scss']
})
export class CorporateDashboardComponent implements OnInit {


  totalcourses : number =0;
  objdashboard_corp:dashboard_corp;
  constructor(private modalService: NgbModal,private apiService: ApiServiceService, private toastService: ToastService) { 

  this.objdashboard_corp = new dashboard_corp();

  }




  ngOnInit(): void {
    this.remainingquota();
    // this.objdashboard_corp = new dashboard_corp();
  }


  //Corporate/remainingquota

  remainingquota(){
    debugger;
    var date = new Date().toISOString()
    var corporateAccId  =sessionStorage.getItem("corporateAccId")
    this.apiService.GetDetails("Corporate/remainingquota?corporateAccId="+corporateAccId +"&currentDate="+date).subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);

      if (rtnData.message == "success") {
         this.objdashboard_corp  = rtnData;
        //  this.objdashboard_corp.totalStudentQuota = 100;
         this.totalcourses = this.objdashboard_corp.pendingCourses + this.objdashboard_corp.completedCourses + this.objdashboard_corp.upcomingCourses
      } else {
        this.toastService.error("Error");
      }
    });
  }
  

  open_tutor(){
    const modalRef = this.modalService.open(AddComponent , { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.name = 'tutor';
    modalRef.componentInstance.student = false;
    modalRef.result.then((result) => {
      alert("result")
      }, (reason) => {
        alert("reason")
      });
  }
  open_std() {
    const modalRef = this.modalService.open(AddComponent , { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.name = 'student';
    modalRef.componentInstance.student = true;
    modalRef.result.then((result) => {
    alert("result")
    }, (reason) => {
      alert("reason")
    });
  }
}
