import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tutor } from 'src/app/Classes/tutor';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-corporate-student-dashboard',
  templateUrl: './corporate-student-dashboard.component.html',
  styleUrls: ['./corporate-student-dashboard.component.scss']
})
export class CorporateStudentDashboardComponent implements OnInit {

  lstTutor :Tutor[];
  lstTutor_currentdate :Tutor[];
  Psize: number = 1000;
  Pno: number = 1;
  constructor(private apiService: ApiServiceService, private router: Router) {
    this.lstTutor  = [];
    this.lstTutor_currentdate = [];
   }

  ngOnInit(): void {
  this.getClassDetails();
  this.Student_Today();
  this.student_upcomming();
  }

  getClassDetails(){
    var stdid = sessionStorage.getItem("loginid")
    const current = new Date();
    current.setMilliseconds(0)
    
    const timestamp = current.getTime();
    debugger;
    var str = "Student/upcomingjobs/"+stdid+"?currentdate="+new Date()+"&timestamp="+timestamp+"&pagenumber="+this.Pno+"&pagesize="+this.Psize
    this.apiService.GetDetails(str).subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      
      if (rtnData.message == "Success") {
        this.lstTutor = rtnData.result.upcomingjobs;

        for(var i= 0 ; i< this.lstTutor.length; i++){
          // if(this.isToday(this.lstTutor[i].jobdate) )
          if(i<2) 
          this.lstTutor_currentdate.push(this.lstTutor[i])
          }
      } else {

      }
    });
  }

  isToday(dateValue: string): boolean {
    
    var d = this.getNowDate(new Date(dateValue));
    var date = new Date();

    // add a day
    date.setDate(date.getDate() -2)
    var dd = this.getNowDate(date);
      
    let isToday = (d === dd);
    return isToday;
}
//Booking/corporate/student/upcoming?studentId=1&currentDate=11%2F12%2F2022
student_upcomming(){
    var stdid = sessionStorage.getItem("loginid")
     debugger;
    this.apiService.GetDetails("Booking/corporate/student/upcoming?studentId="+stdid+"&currentDate="+new Date().toISOString()).subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      
      if (rtnData.message == "Success") {
        // this.lstTutor = rtnData.result.upcomingjobs;

        // for(var i= 0 ; i< this.lstTutor.length; i++){
        //   // if(this.isToday(this.lstTutor[i].jobdate) )
        //   if(i<2) 
        //   this.lstTutor_currentdate.push(this.lstTutor[i])
        //   }
      } else {

      }
    });
}

//Booking/corporate/student/today?studentId=1&currentDate=12%2F11%2F2022
Student_Today(){
    var stdid = sessionStorage.getItem("loginid")
    debugger;
    this.apiService.GetDetails("Booking/corporate/student/today?studentId="+stdid+"&currentDate="+new Date().toISOString()).subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      
      if (rtnData.message == "Success") {
        // this.lstTutor = rtnData.result.upcomingjobs;

        // for(var i= 0 ; i< this.lstTutor.length; i++){
        //   // if(this.isToday(this.lstTutor[i].jobdate) )
        //   if(i<2) 
        //   this.lstTutor_currentdate.push(this.lstTutor[i])
        //   }
      } else {

      }
    });
}
getNowDate(d:Date) {
  //return string
  var returnDate = "";
  //get datetime now
  var today = d;
  //split
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //because January is 0! 
  var yyyy = today.getFullYear();
  //Interpolation date
  if (dd < 10) {
      returnDate += `0${dd}.`;
  } else {
      returnDate += `${dd}.`;
  }

  if (mm < 10) {
      returnDate += `0${mm}.`;
  } else {
      returnDate += `${mm}.`;
  }
  returnDate += yyyy;
  return returnDate;
}
  
  route(url: string,id :any) {

    sessionStorage.setItem("romname",id.toString())
    
    var myurl = `${'std/Home'}/${''}`;
    const that = this;
    that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      that.router.navigate([myurl])
    );
  }

}
