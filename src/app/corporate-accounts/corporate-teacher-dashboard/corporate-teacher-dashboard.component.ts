import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tutor } from 'src/app/Classes/tutor';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-corporate-teacher-dashboard',
  templateUrl: './corporate-teacher-dashboard.component.html',
  styleUrls: ['./corporate-teacher-dashboard.component.scss']
})
export class CorporateTeacherDashboardComponent implements OnInit {

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
      sessionStorage.removeItem("romname")
      this.tutor_upcoming();
      this.tutor_today();
    }
  
    getClassDetails(){
      var tutorid = sessionStorage.getItem("loginid")
      const current = new Date();
      current.setMilliseconds(0);    
      const timestamp = current.getTime();
  
      var str = "Tutor/upcomingjobs/"+tutorid+"?currentdate="+new Date()+"&timestamp="+timestamp+"&pagenumber="+this.Pno+"&pagesize="+this.Psize
      this.apiService.GetDetails(str).subscribe(rtnData => {
        debugger;
        console.log('rtnData', rtnData);
        
        if (rtnData.message == "Success") {
          this.lstTutor = rtnData.result;
          for(var i= 0 ; i< this.lstTutor.length; i++){
          // if(this.isToday(this.lstTutor[i].jobdate))
          if(i<2) 
          this.lstTutor_currentdate.push(this.lstTutor[i])
          }
        
        } else { 
  
        }
      });
    }
    isToday(dateValue: string): boolean {
      
      var d = this.getNowDate(new Date(dateValue));
      var dd = this.getNowDate(new Date());
        
  
      let isToday = (d === dd);
      return isToday;
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
      var myurl = `${'tutor/Home'}/${''}`;
      const that = this;
      that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        that.router.navigate([myurl])
      );
  }

 tutor_upcoming(){
      //Booking/corporate/tutor/upcoming?tutorId=1&currentDate=12%2F11%2F2022
      var tutorid = sessionStorage.getItem("loginid")
      const current = new Date();
      current.setMilliseconds(0);    
      const timestamp = current.getTime();

      this.apiService.GetDetails("Booking/corporate/tutor/upcoming?tutorId="+tutorid+"&currentDate="+timestamp).subscribe(rtnData => {
        debugger;
        console.log('rtnData', rtnData);
        console.log('tutor/upcoming', rtnData);

        
        if (rtnData.message == "Success") {
          // this.lstTutor = rtnData.result;
          // for(var i= 0 ; i< this.lstTutor.length; i++){
          // if(i<2) 
          // this.lstTutor_currentdate.push(this.lstTutor[i])
          // }
        
        } else { 
  
        }
      });

  }
  tutor_today(){
      //Booking/corporate/tutor/today?tutorId=1&currentDate=12%2F12%2F2022

       //Booking/corporate/tutor/upcoming?tutorId=1&currentDate=12%2F11%2F2022
       var tutorid = sessionStorage.getItem("loginid")
       const current = new Date();
       current.setMilliseconds(0);    
       const timestamp = current.getTime();
 
       this.apiService.GetDetails("Booking/corporate/tutor/today?tutorId="+tutorid+"&currentDate="+timestamp).subscribe(rtnData => {
         debugger;
         console.log('rtnData', rtnData);
         console.log('tutor/today', rtnData);
         
         if (rtnData.message == "Success") {
          //  this.lstTutor = rtnData.result;
          //  for(var i= 0 ; i< this.lstTutor.length; i++){
          //  if(i<2) 
          //  this.lstTutor_currentdate.push(this.lstTutor[i])
          //  }
         
         } else { 
   
         }
       });
  }

}
