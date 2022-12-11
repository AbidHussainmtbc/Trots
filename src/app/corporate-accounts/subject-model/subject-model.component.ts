import { Component, NgZone, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import EventEmitter from 'events';
import { corpSubject } from 'src/app/Classes/corporate';

import { EventEmitter } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-subject-model',
  templateUrl: './subject-model.component.html',
  styleUrls: ['./subject-model.component.scss']
})
export class SubjectModelComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  objcorpSubject:corpSubject;
  selectedSubject: string ="";
  lstcorpSubject: corpSubject[]

  
  constructor(public activeModal: NgbActiveModal, private apiService: ApiServiceService, private toastService: ToastService
  )  { 
    this.objcorpSubject = new corpSubject()
    this.lstcorpSubject = []
  }

  ngOnInit(): void {
    this.getSubject();
  }

  getSubject(){
    debugger;
    var date = new Date().toISOString()
    var corporateAccId  =sessionStorage.getItem("corporateAccId")
    this.apiService.GetDetails("Corporate/subjects?corporateAccId="+corporateAccId).subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);

      if (rtnData.message == "success" || rtnData.message == "Success" || rtnData.haserror == false) {

        // this.toastService.success(rtnData.message);
        this.lstcorpSubject = rtnData.result;
      } else {
        this.toastService.error("Error");
      }
    });

  }
  getClassName(p:string) {

    var x = Math.floor(Math.random() * 6);
    var name = "btn-"+ x
    return name;
   }

  SaveandClose(id: any) {
    this.selectedSubject = id
    this.passEntry.emit(this.selectedSubject);
    this.activeModal.close()
    // this.NgbModalRef.close();
  }
}
