import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { gettutorsubjects, Result, subjectList } from 'src/app/Classes/tutor';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastService } from '../../services/toast.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.scss']
})
export class QuestionnairesComponent implements OnInit {

  isLoading = false;
  Result:gettutorsubjects[];
  objResult:gettutorsubjects;
  istestenabled: boolean = false;
  constructor(
    private router: Router, private toastService: ToastService,private apiService: ApiServiceService
  ) { 
    this.Result= [];
    this.objResult = new gettutorsubjects();
  }

 
    ngOnInit(): void {
      //
      this.getClassDetails();
  }

  getClassDetails(){
    debugger;
    var Userid = sessionStorage.getItem("loginid")
    this.apiService.get_noPagination(Userid,"Userid","Subject/gettutorsubjects").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
     if(rtnData.istestenabled == false){
        this.swalpop();
     }
     else{
       this.istestenabled = true;
      if (rtnData.message == "Success") {
        this.Result = rtnData.result;
      } else {
        this.toastService.error('Some Error Occured');
      }
     }
    });
  }
  GetQuestions(index:any){
    debugger;
    
    this.objResult = this.Result[index];
    if(this.objResult.totalattempts - this.objResult.attemptsdone  > 0){
    sessionStorage.setItem("SubID",this.objResult.id.toString())
    this.navigateToUrl('quiz')
  }
  else{
    this.toastService.error('You have Zero remaining attempts');
  }
  }
  navigateToUrl(userLoc: string): void {
    this.toastService.success(`navigate to ${userLoc}`);
    this.router.navigateByUrl(`auth/${userLoc}`);
  }

  swalpop(){

    var temp = this.Result.filter(x=> x.totalattempts != x.attemptsdone && x.testresult != "Pass") ;
    if(temp.length > 0){
      this.toastService.error('You have remaining Quizes please attempt');
    }
    else {
      swal({
        title: "TROTS!",
        text: "Please wait we are reviewing your profile",
        icon: "info"}
    )
      .then((willDelete) => {
        debugger;
        if (willDelete) {
          this.router.navigateByUrl(`main`);
        } else {
          this.router.navigateByUrl(`main`);
        }
      });
    }
  }
}
