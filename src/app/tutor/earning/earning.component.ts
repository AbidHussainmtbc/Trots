import { Component, OnInit } from '@angular/core';
import { tutorEarning } from 'src/app/Classes/tutor';
import { ApiServiceService } from 'src/app/services/api-service.service';
import * as Chart from 'chart.js';
@Component({
  selector: 'app-earning',
  templateUrl: './earning.component.html',
  styleUrls: ['./earning.component.scss']
})
export class EarningComponent implements OnInit {

  tutorEarning :tutorEarning;
  constructor(private apiService: ApiServiceService) { 
    this.tutorEarning = new tutorEarning();
  }

  ngOnInit(): void {
    this.getDetails();
    this.canvas = document.getElementById('myChart');
  this.ctx = this.canvas.getContext('2d');
const myChart = new Chart(this.ctx, {
type: 'bar',
data: {
labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June' , 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
datasets: [{
label: 'Total cases.',
data: [100, 90, 75, 88, 60,95,50,60,90,88,52,0],
backgroundColor: ['Blue','Blue' ,'Blue' ,'Blue' ,'Blue' , 'Blue','Blue' ,'Blue' ,'Blue','Blue','Blue','Blue'],
borderWidth: 1
}]
},
options: {
legend: {
display: false
},
responsive: false,
display: true
}
});

  }

  getDetails(){
    var tutorid = sessionStorage.getItem("loginid")
    this.apiService.get(tutorid,"tutorid","Tutor/earnings").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      
      if (rtnData.message == "Success") {
        this.tutorEarning = rtnData.result;
        // alert(JSON.stringify(this.tutorEarning));
        console.log('navigate to respective dashboard');
      
      } else {

      }
    });
  }

  // public barChartOptions:any = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };

  //   public mbarChartLabels:string[] = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July','Aug','Sep','Oct','Nov','Dec'];
  //   public barChartType:string = 'bar';
  //   public barChartLegend:boolean = true;
  
  //   public barChartColors:Array<any> = [
  //   {
  //     backgroundColor: 'rgba(105,159,177,0.2)',
  //     borderColor: 'rgba(105,159,177,1)',
  //     pointBackgroundColor: 'rgba(105,159,177,1)',
  //     pointBorderColor: '#fafafa',
  //     pointHoverBackgroundColor: '#fafafa',
  //     pointHoverBorderColor: 'rgba(105,159,177)'
  //   },
  //   { 
  //     backgroundColor: 'rgba(77,20,96,0.3)',
  //     borderColor: 'rgba(77,20,96,1)',
  //     pointBackgroundColor: 'rgba(77,20,96,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(77,20,96,1)'
  //   }
  // ];
  //   public barChartData:any[] = [
  //     {data: [55, 60, 75, 82, 56, 62, 80], label: 'Company A'}
  //   ];
  
  //   // events
  //   public chartClicked(e:any):void {
  //     console.log(e);
  //   }
  
  //   public chartHovered(e:any):void {
  //     console.log(e);
  //   }
  
  //   public randomize():void {
  //     let data = [
  //       Math.round(Math.random() * 100),
  //       Math.round(Math.random() * 100),
  //       Math.round(Math.random() * 100),
  //       (Math.random() * 100),
  //       Math.round(Math.random() * 100),
  //       (Math.random() * 100),
  //       Math.round(Math.random() * 100)];
  //     let clone = JSON.parse(JSON.stringify(this.barChartData));
  //     clone[0].data = data;
  //     this.barChartData = clone;
  //   }
  canvas: any;
ctx: any;
}