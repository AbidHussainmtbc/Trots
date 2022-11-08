import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agrement } from 'src/app/Classes/tutor';
import { signupFin } from 'src/app/Classes/user';
import { environment } from 'src/environments/environment';
import { ApiServiceService } from '../../services/api-service.service';
import { ToastService } from '../../services/toast.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-term-conditions',
  templateUrl: './term-conditions.component.html',
  styleUrls: ['./term-conditions.component.scss']
})
export class TermConditionsComponent implements OnInit {

  isLoading = false;
  acceptTerms = false;
  useESig = false;
  Agrement:Agrement;
  eSig: string;
  signupFin :signupFin;
  envData;
  constructor(
    private router: Router, private toastService: ToastService,
    private utilsService: UtilsService, private apiService: ApiServiceService
  ) {
    this.envData = environment;
    this.Agrement = new Agrement();
    this.signupFin  =  new signupFin();
  }

  ngOnInit(): void {
    //
    this.getDetails();
  }

  getDetails(){
   // var tutorid = '1';
    debugger;
    this.apiService.GetDetails("Compliance/tutor").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      
      if (rtnData.message == "Success") {
        this.Agrement =rtnData; 
      } else {

      }
    });
  }

  finishsignup(){
    debugger;
    // this.navigateToUrl('std/Reg/StdComplaince'); 
    // return



    this.signupFin.esignature = this.eSig;
    this.signupFin.userguid= localStorage.getItem('regUserGuid');
    this.signupFin.currentdatetime = new Date().toISOString();
    this.signupFin.apikey = this.envData.apiAccessKey;
    this.apiService.post(this.signupFin , "SignUp/student/finishsignup").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      
      if (rtnData.message == "Success") {
        sessionStorage.setItem("loginid",rtnData.result.userid);
        this.navigateToUrl('std/Reg/StdComplaince'); 
      } else {
        this.toastService.error(rtnData.message);
      }
    });
  }

  navigateToUrl(userLoc: string): void {
    this.toastService.success(`navigate to ${userLoc}`);
    this.router.navigateByUrl(`${userLoc}`);
  }
}
