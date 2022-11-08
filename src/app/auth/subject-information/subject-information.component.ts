import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { subjectswithcategories } from 'src/app/Classes/management';
import { ApiServiceService } from '../../services/api-service.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-subject-information',
  templateUrl: './subject-information.component.html',
  styleUrls: ['./subject-information.component.scss']
})
export class SubjectInformationComponent implements OnInit {

  isLoading = false;
  selectSubject = true;
  addCertificates = false;

  // generalCategory = [];
  // subCategory = [];
  subjectswithcategories:subjectswithcategories[];

  selGenCategory;
  selSubCategory;
  temp_selGenCategory: categorylist;
  selectedSubjects = [];
  copyselectedSubjects = [];
  currencySymbol:string ="";
  selectedindex: number = 0;
  constructor(
    private router: Router, private toastService: ToastService, private apiService: ApiServiceService
  ) {
    this.subjectswithcategories  =[];
    this.temp_selGenCategory = new categorylist();
  }

  async ngOnInit(): Promise<void> {
    this.currencySymbol = sessionStorage.getItem("currencySymbol")
    this.currencySymbol = "Enter Amount in " +this.currencySymbol;
    this.isLoading = true;
    this.selectSubject = true;

    debugger;
    await this.apiService.getsubjectswithcategories().subscribe(res => {
      if (res.statuscode === 200) {
        // this.subCategory = res.result;
        this.subjectswithcategories = res.result;
      }
    });

    // await this.apiService.getAllSubjects().subscribe(res => {
    //   if (res.statuscode === 200) {
    //     this.generalCategory = res.result;
    //   }

      this.selGenCategory = null;
      this.selSubCategory = null;

      this.isLoading = false;
    //});
  }
  selected(i :any){
    this.selectedindex = i;
  }

  navigateToUrl(userLoc: string, action): void {
  debugger;

    if(this.selectedSubjects.length >0){
      debugger;
      if (this.selectSubject) {
        if (action === 'back') {
          this.router.navigateByUrl(`auth/${userLoc}`);
        } else {
          this.selectSubject = !this.selectSubject;
          this.addCertificates = !this.addCertificates;
        }
      } else if (this.addCertificates) {
        if (action === 'back') {
          this.selectSubject = !this.selectSubject;
          this.addCertificates = !this.addCertificates;
        } else {
          console.log('Save subject information');
          if(this.checkValidation()){
            this.isLoading = true;
  
            this.apiService.fnAddSubjectInfo(this.selectedSubjects).subscribe(rtnData => {
              this.isLoading = false;
    
              if (rtnData.statuscode === 200) {
                this.toastService.success(rtnData.message);
                this.router.navigateByUrl(`auth/${userLoc}`);
              } else {
                this.toastService.error(rtnData.message);
              }
            });
  
          }
         }
      }
    }
   else {
    this.toastService.error("Please select any record.");
   }
  }

  checkValidation() {
for(var i = 0; i<this.selectedSubjects.length; i++ )
    if (this.isNullOrEmpty(this.selectedSubjects[i].timefrom)) {
      this.toastService.error("Please enter From Time.");
      return false;
    }
    else if (this.isNullOrEmpty(this.selectedSubjects[i].timeto)) {
      this.toastService.error("Please enter To Time.");
      return false;
    }
    else if (this.isNullOrEmpty(this.selectedSubjects[i].subjectfee)) {
      this.toastService.error("Please enter subject fee.");
      return false;
    }
    else if (this.isNullOrEmpty(this.selectedSubjects[i].experience)) {
      this.toastService.error("Please enter experience.");
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
  addSubject(): void {
    debugger;
    if (this.selGenCategory && this.selSubCategory) {
      this.temp_selGenCategory = new categorylist();
      this.temp_selGenCategory.id = this.selGenCategory.subjectid;
      this.temp_selGenCategory.name = this.selGenCategory.subjecname;
      this.selectedSubjects.push({
        classInfo: this.selSubCategory,
        subjectInfo: this.temp_selGenCategory,
        experience: null,
        subjectfee: null,
        document: null,
        documentpath: null,
        timefrom: '',
        timeto: ''
      });
    }

    this.selGenCategory = null;
    this.selSubCategory = null;
  }
  remove(index : number){
    debugger;
    this.copyselectedSubjects = [];
    for(var i = 0; i<this.selectedSubjects.length ; i++){
      if(i != index){
        this.copyselectedSubjects.push(this.selectedSubjects[i]);
      }
    }
    this.selectedSubjects = this.copyselectedSubjects;
  }
  uploadSubjectCertificate(event: any, selSub): void {
    debugger;
    const file = event.target.files[0];
    this.isLoading = true;

    selSub.document = file;
    this.apiService.postCertificate(selSub).subscribe(res => {
      this.isLoading = false;

      if (res.statuscode === 200) {
        selSub.documentPath = res.certificatePath;
      } else {
        this.toastService.error(res.message);
      }
    });
  }

  
}

export class categorylist{
  id: number;
  name: string;
  /**
   *
   */
  constructor() {
      this.id = 0;
      this.name= "";
  }
}