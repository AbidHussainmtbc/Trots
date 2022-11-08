import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agrement } from 'src/app/Classes/tutor';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastService } from 'src/app/services/toast.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-std-complaince',
  templateUrl: './std-complaince.component.html',
  styleUrls: ['./std-complaince.component.scss']
})
export class StdComplainceComponent implements OnInit {
  Agrement : Agrement;
  acceptTerms:boolean =false;
  constructor( private router: Router, private toastService: ToastService,
    private utilsService: UtilsService, private apiService: ApiServiceService) { 
      this.Agrement = new Agrement();
    }

  ngOnInit(): void {
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
       this.navigateToUrl('main')
      } else {

      }
    });
  }

  navigateToUrl(userLoc: string): void {
    this.toastService.success(`navigate to ${userLoc}`);
    this.router.navigateByUrl(`${userLoc}`);
  }

//  /Compliance/tutor

}

