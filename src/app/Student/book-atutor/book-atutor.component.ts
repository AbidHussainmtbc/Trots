import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { subjectswithcategories } from 'src/app/Classes/management';
import { Categorylist } from 'src/app/Classes/tutor';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastService } from 'src/app/services/toast.service';
import { searchOnsiteTutor } from 'src/app/Classes/student';
@Component({
  selector: 'app-book-atutor',
  templateUrl: './book-atutor.component.html',
  styleUrls: ['./book-atutor.component.scss']
})
export class BookATutorComponent implements OnInit {

  subjectswithcategories: subjectswithcategories[];
  searchOnsiteTutor: searchOnsiteTutor;
  isOnsite: boolean=false;
  subjectName:string ="";
  selGenCategory;
  selSubCategory;
  selectedindex: number = 0;
  constructor(private apiService: ApiServiceService, private router: Router,
    private toastService: ToastService) {
    this.subjectswithcategories = [];
    this.searchOnsiteTutor = new searchOnsiteTutor();
    this.selGenCategory = null;
    this.selSubCategory = null;
  }

  subjects: Categorylist[];
  ngOnInit(): void {
    this.getSubject();
  }
  public minDate: Date =  new Date((new Date()).getTime() - (3 * 86400000))
  public maxDate: Date = new Date((new Date()).getTime() + (360 * 86400000))
  public value: Date = new Date((new Date()).getTime() - (3 * 86400000))

  getSubject() {

    debugger;
    this.apiService.GetDetails("Subject/getsubjectswithcategories?classid=-1").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);

      if (rtnData.message == "Success") {
        this.subjectswithcategories = rtnData.result;
      } else {
        this.toastService.error("Error");
      }
    });

  }
  route(url: string) {
    debugger;

    let navigationExtras: NavigationExtras = {
      queryParams: {
        subjectid: this.searchOnsiteTutor.subjectid,
        subjectcategoryid: this.searchOnsiteTutor.subjectcategoryid,
        fromprice: this.searchOnsiteTutor.fromprice,
        toprice: this.searchOnsiteTutor.toprice,
        fromtime: this.searchOnsiteTutor.fromtime,
        totime: this.searchOnsiteTutor.totime,
        radius: this.searchOnsiteTutor.radius,
        startdate: this.value,
        numberofweek: this.searchOnsiteTutor.numberofweek,
        subjectName : this.subjectName
      }
    }

    var myurl = `${url}`;
    const that = this;
    that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      that.router.navigate([myurl], navigationExtras)
    );
  }

  Counter(key: string) {
    if (key == "+") {
      this.searchOnsiteTutor.numberofweek++;
    }
    else {
      this.searchOnsiteTutor.numberofweek--;
    }
  }

  TutorDistance(key:any)
  {
    this.searchOnsiteTutor.radius = key;
  }
  selected(i: any) {
    debugger

      this.subjects = this.subjectswithcategories.filter( x => x.subjectid == i)[0].categorylist
      this.subjectName = this.subjectswithcategories.filter( x => x.subjectid == i)[0].subjecname
      // [this.selectedindex].categorylist;
   
  };
  searchtype(type:boolean){
    this.isOnsite = type;
  }

  search(){
    if(this.isOnsite){
      this.route('std/OnSiteTutorSearch')
    }
    else {
      this.route('std/SearchOnlineTutor')
    }

  }
}
