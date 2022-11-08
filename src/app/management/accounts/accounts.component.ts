import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { studentAccount } from 'src/app/Classes/student';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastService } from 'src/app/services/toast.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
 pageNo: number = 1;
 Pagesize: number = 100;
 p: number = 1;
 lststudentAccount :studentAccount[];
  constructor( private router: Router, private toastService: ToastService,
    private utilsService: UtilsService, private apiService: ApiServiceService) { 
      this.lststudentAccount = [];
    }

  ngOnInit(): void {
    this.getClassDetails();
  }

  getClassDetails(){
    debugger;
    var Userid = sessionStorage.getItem("loginid")
    this.apiService.noParam_GetDetails_pagination("Users/GetAllUsers" , "recordsperpage","pageno",this.Pagesize,this.pageNo).subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      
      if (rtnData.message == "Success" || rtnData.message == "success") {
       // this.Result = rtnData.result;
       console.log("Tutor");
       console.log(rtnData);
     this.lststudentAccount = rtnData.result.allusers;
      } else {

      }
    });
  }

  ///Users/GetAllUsers
}
