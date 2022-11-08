import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quizanswerslist, ResultResponseGetTutorSubjectsQuestion,QuizAnswer } from 'src/app/Classes/tutor';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastService } from 'src/app/services/toast.service';
import swal from 'sweetalert';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  Result:any
  selectedNumber:number
  timeLeft: number = 60;
  interval;
  lstQuizanswerslist:Quizanswerslist[];
  objQuizanswerslist : Quizanswerslist;
  QuizAnswer :QuizAnswer;
  isLoading : boolean= true;
  
  ResultResponseGetTutorSubjectsQuestion:ResultResponseGetTutorSubjectsQuestion[];
  index :number = 0
  totalQuestion :number = 0
  envData;
  constructor(private router: Router, private toastService: ToastService,private apiService: ApiServiceService
    ) { 
      this.envData = environment;
      this.Result= [];
      this.ResultResponseGetTutorSubjectsQuestion = [];
      this.lstQuizanswerslist = [];
      this.objQuizanswerslist = new  Quizanswerslist();
      this.QuizAnswer  = new QuizAnswer();
      
    } 

  ngOnInit(): void {
    this.getquestions();
  }
  select(n:any){
    debugger;
    this.selectedNumber = n;
    setTimeout(() => {
    this.objQuizanswerslist = new  Quizanswerslist();
    this.objQuizanswerslist.questionid = this.ResultResponseGetTutorSubjectsQuestion[this.index].id;
    this.objQuizanswerslist.selectedoption = this.ResultResponseGetTutorSubjectsQuestion[this.index].options[n].value;
    this.lstQuizanswerslist.push(this.objQuizanswerslist);  

    this.index =this.index +1;
    this.timeLeft = this.ResultResponseGetTutorSubjectsQuestion[this.index].questiontime;
    
      this.selectedNumber = 5;
    }, 1000);
    
  }
  getquestions(){
    var subjID = sessionStorage.getItem("SubID");
    var userid = sessionStorage.getItem("loginid");
    var str = "AssessmentTest/getquestions?userid="+userid+"&subjectid="+subjID+"&timestamp=1642530375878";

   // var str = "AssessmentTest/getquestions?userid=76&subjectid=1&timestamp=1642530375878";
    this.apiService.GetDetails(str).subscribe(rtnData => {
      debugger;
      if (rtnData.message == "Success") {
        this.index = 0
        this.lstQuizanswerslist = [];
        this.ResultResponseGetTutorSubjectsQuestion = rtnData.result;
        this.totalQuestion = this.ResultResponseGetTutorSubjectsQuestion.length;
        this.startTimer();
        this.timeLeft =this.ResultResponseGetTutorSubjectsQuestion[0].questiontime;
        console.log(this.ResultResponseGetTutorSubjectsQuestion);
      } else {

      }
    });
  }

  submitQuiz(){
    debugger;  
    var subjID = sessionStorage.getItem("SubID");
    var userid = sessionStorage.getItem("loginid");
    this.QuizAnswer.userid = Number(userid);
    this.QuizAnswer.subjectid = Number(subjID);
    this.QuizAnswer.answers = this.lstQuizanswerslist;
    this.QuizAnswer.apikey = this.envData.apiAccessKey;
    this.apiService.post(this.QuizAnswer,'AssessmentTest/saveanswer').subscribe(rtnData => {
      debugger;
      if (rtnData.message == "Success") {
        if(rtnData.ispassed){
          swal("Passed!", "Congratulations!", "success");
        }
        else {
          swal("Sorry!", "Please try Again", "Error");
        }
      }
      else  {
        swal("Passed!", "Please try Again", "Error");
      }
      this.navigateToUrl('attempt-test')
    });
  }
  startTimer() {
    this.timeLeft = 60;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.select(0   );
        this.timeLeft = 60;
      }
    },1000)
  }

  navigateToUrl(userLoc: string): void {
    this.toastService.success(`navigate to ${userLoc}`);
    this.router.navigateByUrl(`auth/${userLoc}`);
  }
//  AssessmentTest/getquestions

}
