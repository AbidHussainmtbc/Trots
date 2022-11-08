import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-main',
  templateUrl: './auth-main.component.html',
  styleUrls: ['./auth-main.component.scss']
})
export class AuthMainComponent implements OnInit {

  constructor() {
    console.log('loading admin-panel components');
  }
loginName : string ="";
  ngOnInit(): void {
    //
    // Nadeem Khan
    this.loginName = sessionStorage.getItem("loginid"); 
  }

}
