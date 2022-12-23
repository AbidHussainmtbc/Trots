import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CorpStudent, CorpTutor, subjectResp } from 'src/app/Classes/corporate';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  @Input() public name;
  @Input() public student;

  objCorpTutor:CorpTutor;
  lstCorpTutor:CorpTutor[];

  objCorpStudent : CorpStudent;
  lstCorpStudent : CorpStudent[]

  lstsubjectResp:subjectResp[];
  isStudent:boolean = false;
  constructor(
    private apiService: ApiServiceService, private toastService: ToastService,
    private activeModal: NgbActiveModal
  ) { 
    this.objCorpTutor = new CorpTutor();
    this.lstCorpTutor = [];

    this.objCorpStudent = new CorpStudent()
    this.lstCorpStudent = [];
    this.lstsubjectResp = [];
  }

  ngOnInit(): void {
    this.isStudent = this.student
    this.getsubjects();
  }

  isMale(type:any){
    if(type == 'm'){
      this.objCorpStudent.gender = 'm'
    }
    else{
      this.objCorpStudent.gender = 'f'
    }
  }

  isMale_tutor(type:any){
    if(type == 'm'){
      this.objCorpTutor.gender = 'm'
    }
    else{
      this.objCorpTutor.gender = 'f'
    }
  }
  add(){
    debugger;
    if(this.isStudent){
      var token = sessionStorage.getItem("token");
      this.objCorpStudent.authtoken = token
      this.apiService.post(this.objCorpStudent , "Corporate/student").subscribe(rtnData => {
        debugger;
        console.log('rtnData', rtnData);
        
        if (rtnData.haserror  == false ) {
          this.toastService.success(rtnData.message);
          this.activeModal.close();
          
        } else {
          this.toastService.error(rtnData.message);
        }
      });

    }
    else{
      var token = sessionStorage.getItem("token");
      this.objCorpTutor.authtoken = token

      for(var x = 0 ; x< this.lstsubjectResp.length; x++){
        if(this.lstsubjectResp[x].selected){
          if(this.objCorpTutor.subjectIds == ""){
            this.objCorpTutor.subjectIds = this.lstsubjectResp[x].id.toString(); 
          }
          else {
              this.objCorpTutor.subjectIds =   this.objCorpTutor.subjectIds  + ","+this.lstsubjectResp[x].id.toString(); 
          }
        }
      }

      this.apiService.post(this.objCorpTutor , "Corporate/tutor").subscribe(rtnData => {
        debugger;
        console.log('rtnData', rtnData);
        
        if (rtnData.haserror == "false") {
          // this.lstsearchOnsiteTutor_Result = rtnData.result;
          this.toastService.success(rtnData.message);
          this.activeModal.close();
        } else {
          this.toastService.error(rtnData.message);
        }
      });
    }

  }

  stdAdded(id: any){}
  getsubjects() {
    debugger;
    var corporateAccId = sessionStorage.getItem("corporateAccId")
    this.apiService.GetDetails("Corporate/subjects?corporateAccId=" + corporateAccId).subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);

      if (rtnData.message == "success") {
         this.lstsubjectResp = rtnData.result;
         for(var i = 0 ; i < this.lstsubjectResp.length ; i++){
          this.lstsubjectResp[i].selected = false;
         }
      } else {
        this.toastService.error("Error");
      }
    });
  }


}
