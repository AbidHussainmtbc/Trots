import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../../services/api-service.service';
import { ToastService } from '../../services/toast.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-institution-info',
  templateUrl: './institution-info.component.html',
  styleUrls: ['./institution-info.component.scss']
})
export class InstitutionInfoComponent implements OnInit {

  instituteForm: FormGroup;
  institutionData = [];
  isLoading = false;
  fileName:string ="";
  fileName_ext:string ="";
  instituteList = [
    {name: 'School', value: 'school'},
    {name: 'College', value: 'college'},
    {name: 'University', value: 'University'}
  ];

  institutionRecords = [];

  constructor(
    private formBuilder: FormBuilder, private router: Router, private toastService: ToastService,
    private utilsService: UtilsService, private apiService: ApiServiceService
  ) {
  }

  ngOnInit(): void {
    this.createInstituteForm();
    debugger;
  }

  onDropdownItemSelected($event: any): void {
    console.log('selected Item', $event);
  }

  addInstitute(): void {
    debugger;
    if(this.checkValidation()){
    this.isLoading = true;

    // if (this.instituteForm.invalid) {
    //   return this.utilsService.validateAllFormFields(this.instituteForm);
    // }

    this.institutionData.push(this.instituteForm.value);
    this.instituteForm.reset();

    this.isLoading = false;
    this.fileName =""
    }
  }

  uploadCertificate(event: any): void {
    debugger;
    const file = event.target.files[0];
    this.fileName = file.name;
    this.fileName_ext = this.fileName.split('.')[1];
    this.isLoading = true;

    this.instituteForm.controls.certificateInfo.setValue(file);

    this.apiService.postFile(this.instituteForm.value).subscribe(res => {
      this.isLoading = false;

      if (res.statuscode === 200) {
        this.instituteForm.controls.documentPath.setValue(res.documentPath);
      } else {
        this.toastService.error(res.message);
      }
    });
  }

  navigateToUrl(url: string): void {
    this.router.navigateByUrl(`auth/${url}`);
  }

  fnSaveInstituteInfo(): any {
    debugger;
    if(this.checkValidation()){
    this.isLoading = true;

    this.apiService.fnAddEducationalInfo(this.institutionData).subscribe(rtnData => {
      this.isLoading = false;
debugger;
      if (rtnData.statuscode === 200) {
        this.toastService.success(rtnData.message);
        this.router.navigateByUrl('auth/subjects');
      } else {
        this.toastService.error(rtnData.message);
      }
    });
  }
  }

  private createInstituteForm(): void {
    this.instituteForm = this.formBuilder.group({
      institute: [''],
      orgName: ['', Validators.required],
      passYear: ['', Validators.required],
      grade: ['', Validators.required],
      percentage: ['', Validators.required],
      certificateInfo: [''],
      documentPath: ['']
    });
  }


  checkValidation() {

     if (this.isNullOrEmpty(this.instituteForm.value.institute)) {
      this.toastService.error("Please enter Level.");
      return false;
    }
    else if (this.isNullOrEmpty(this.instituteForm.value.grade)) {
      this.toastService.error("Please enter grade.");
      return false;
    }


    else if (this.isNullOrEmpty(this.instituteForm.value.orgName)) {
      this.toastService.error("Please enter orgName.");
      return false;
    }
    else if (this.isNullOrEmpty(this.instituteForm.value.passYear)) {
      this.toastService.error("Please enter passYear");
      return false;
    }
    else if (this.isNullOrEmpty(this.instituteForm.value.percentage)) {
      this.toastService.error("Please enter percentage");
      return false;
    }
else if (this.isNullOrEmpty(this.instituteForm.value.certificateInfo)) {
  this.toastService.error("Please attach document.");
  return false;
}
    else {
      return true;
    }
  }

  isNullOrEmpty(str: string) {
    if (str == "" || str == undefined || str == null) {
      return true;
    }
    else {
      return false;
    }
  }
}
