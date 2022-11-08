import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-classroom',
  templateUrl: './student-classroom.component.html',
  styleUrls: ['./student-classroom.component.scss']
})
export class StudentClassroomComponent implements OnInit {
   constructor(private router: Router) { }

  ngOnInit(): void {
  }

  authToken = '';

Open(str:any){
  this.gotoRegistration(str)
    }
    Redirect(url: string) {
      var myurl = `${url}/${''}`;
      const that = this;
      that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        that.router.navigate([myurl])
      );
    }
    gotoRegistration(str:any): void {
      var myurl = `${'std'}/${str}`;
      this.router.navigateByUrl(myurl);
    }
}