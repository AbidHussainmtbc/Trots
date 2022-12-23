import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CorpStudent, ViewDeleteStudent } from 'src/app/Classes/corporate';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastService } from 'src/app/services/toast.service';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-schedule-classes-modal',
  templateUrl: './schedule-classes-modal.component.html',
  styleUrls: ['./schedule-classes-modal.component.scss']
})
export class ScheduleClassesModalComponent implements OnInit {
  // @Input() public ViewDeleteStudent;
  @Input() public user;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  objViewDeleteStudent: ViewDeleteStudent;

  objCorpStudent: CorpStudent;
  lstCorpStudent: CorpStudent[]

  constructor(public activeModal: NgbActiveModal, private apiService: ApiServiceService, private toastService: ToastService) {
    debugger;
    this.objViewDeleteStudent = new ViewDeleteStudent();

    this.objCorpStudent = new CorpStudent();
    this.lstCorpStudent = []

  }

  ngOnInit(): void {
    debugger;
    console.log(this.user);
    this.objViewDeleteStudent = this.user;
    this.getStudent();
  }

  stdAdded(id: any) {

  }
  stdDeleted() {

  }

  SaveandClose() {


    var temp = this.lstCorpStudent.filter( x=> x.selected == true)
    var stdids= "";
    for(var t = 0; t < temp.length; t++){
      if(stdids ==""){
        stdids = temp[t].id.toString()
      }
      else {
        stdids = stdids +","+temp[t].id.toString()
      }
    }
    this.passEntry.emit(stdids);
    this.activeModal.close()
    // this.NgbModalRef.close();
  }
  getStudent() {

    debugger;
    var date = new Date().toISOString()
    var corporateAccId = sessionStorage.getItem("corporateAccId")
    this.apiService.GetDetails("Corporate/students?corporateAccId=" + corporateAccId).subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);

      if (rtnData.message == "success") {
        this.lstCorpStudent = rtnData.result;


        var temp = this.objViewDeleteStudent.stdID.split(',')
        for (var x = 0; x < this.lstCorpStudent.length; x++) {
          this.lstCorpStudent[x].selected = false;
        }


        for (var x = 0; x < this.lstCorpStudent.length; x++) {
          for (var t = 0; t < temp.length; t++) {
            if(temp[t] == this.lstCorpStudent[x].id.toString()){
              this.lstCorpStudent[x].selected = true;
            }
          }
        }
      } else {
        this.toastService.error("Error");
      }
    });

  }


  // // /Corporate/subjects

}
