import { Component, OnInit } from '@angular/core';
import { allRating } from 'src/app/Classes/tutor';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  allRating:allRating[];
  constructor(private apiService: ApiServiceService) { 
    this.allRating = [];
  }

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails(){
    var tutorid = sessionStorage.getItem("loginid")
    this.apiService.get(tutorid,"tutorid","Tutor/rating").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      
      if (rtnData.message == "Success") {
        this.allRating = rtnData.result;
        this.allRating[0].rating = 3;
        // alert(JSON.stringify(this.allRating));
        // console.log('navigate to respective dashboard');
      
      } else {
        
      }
    });
  }

}
