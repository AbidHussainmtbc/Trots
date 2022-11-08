import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allstudents } from 'src/app/Classes/management';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastService } from 'src/app/services/toast.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  allstudents :allstudents[];
  p: number = 1;
  constructor( private router: Router, private toastService: ToastService,
    private utilsService: UtilsService, private apiService: ApiServiceService) {
      this.allstudents = [];
     }

  ngOnInit(): void {
    this.getClassDetails();
  }

  getClassDetails(){
    debugger;
    var Userid = sessionStorage.getItem("loginid")
    this.apiService.noParam_GetDetails_pagination("Users/GetAllStudents","pageno","recordsperpage").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      
      if (rtnData.message == "Success") {
        console.log("student");
        console.log(rtnData);
        this.allstudents  = rtnData.result.allstudents;
      } else {

      }
    });
  }

}


