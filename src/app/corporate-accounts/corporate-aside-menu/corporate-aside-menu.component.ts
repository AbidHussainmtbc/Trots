import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariableService } from 'src/app/services/global-variable.service';

@Component({
  selector: 'app-corporate-aside-menu',
  templateUrl: './corporate-aside-menu.component.html',
  styleUrls: ['./corporate-aside-menu.component.scss']
})
export class CorporateAsideMenuComponent implements OnInit {

  FormName: string = "";
  UserName: string = "";
  constructor(private router: Router, private GlobalVariableService: GlobalVariableService) { }

  ngOnInit(): void {
    debugger;
    this.FormName =  this.GlobalVariableService.FormName;
    if (this.FormName == "") {
      this.FormName = "Student Dashboard";
    }
    this.UserName = this.GlobalVariableService.loginUserName;
  }

  setFormName(formName: string) {
    this.GlobalVariableService.FormName = formName;
    this.FormName =  this.GlobalVariableService.FormName;
  }

  route(url: string) {
    var myurl = `${url}/${''}`;
    const that = this;
    that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      that.router.navigate([myurl])
    );
  }

}
