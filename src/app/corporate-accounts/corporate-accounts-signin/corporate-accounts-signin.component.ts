import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CorpSignin } from 'src/app/Classes/corporate';
import { User } from 'src/app/Classes/user';
import { loginClass } from 'src/app/main/main/main.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { GlobalVariableService } from 'src/app/services/global-variable.service';
import { ToastService } from 'src/app/services/toast.service';
import { UtilsService } from 'src/app/services/utils.service';
import { environment } from 'src/environments/environment';
// import { environment } from '../../environments/environment';


@Component({
  selector: 'app-corporate-accounts-signin',
  templateUrl: './corporate-accounts-signin.component.html',
  styleUrls: ['./corporate-accounts-signin.component.scss']
})
export class CorporateAccountsSigninComponent implements OnInit {
  envData;
  loginForm: FormGroup;

  isTeacher = true;
  isStudent = false;
  isLoading = false;
  iscarporateAccount = false;
  isCaptchaSuccess = false;
  password;
  objUser: User;
  objCorpSignin: CorpSignin
  show = false;

  objloginClass: loginClass;
  // siteKey = 'AIzaSyDwaCSdaDLWeGbO6qaSdNKjgQvZPpHI3-I';
  siteKey: 'AIzaSyCESelr24rnz4FtxqD86-2lMZjG5sFePGc'
  constructor(
    private formBuilder: FormBuilder, private router: Router, private toastService: ToastService,
    private utilsService: UtilsService, private apiService: ApiServiceService, private GlobalVariableService: GlobalVariableService) {
    this.envData = environment;
    this.objUser = new User;
    this.objCorpSignin = new CorpSignin();

    this.objloginClass = new loginClass();
  }

  ngOnInit(): void {
    this.password = 'password';
    this.createLoginForm();
  }
  onClick() {
    debugger
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
  signIn(): void {

    if (this.iscarporateAccount == true) {

      debugger;
      this.objCorpSignin.apikey = this.envData.apiAccessKey;
      this.objCorpSignin.username = this.objloginClass.email;
      this.objCorpSignin.password = this.objloginClass.password;

      this.apiService.post(this.objCorpSignin,"SignIn/corporate").subscribe(rtnData => {
        debugger;
        console.log('rtnData', rtnData);
  
        if (rtnData.message == "Success" || rtnData.message == "success") {

          sessionStorage.setItem("corporateAccId", rtnData.result.id)
          var x = rtnData.result.authtoken;
          sessionStorage.setItem("token", x.toString())
          sessionStorage.setItem("loginid", this.objUser.tutorid.toString())
          sessionStorage.setItem("loginEmail", this.objUser.email.toString())
          this.GlobalVariableService.loginUserName = this.objUser.firstname + " " + this.objUser.lastname;
          this.Redirect('carporate/dashboard')
        } else {
          this.Redirect('carporate/dashboard')
          this.toastService.error("Error");
        }
      });
    }
    else {
      this.apiService.fnLoginUser(this.objloginClass, false, this.isTeacher).subscribe(rtnData => {
        console.log('rtnData', rtnData);
        this.isLoading = false;
        debugger;

        if (rtnData.statuscode === 200) {
          debugger;
          this.objUser = rtnData.result;
          console.log('navigate to respective dashboard');

          if (this.isTeacher) {
            var x = rtnData.result.authtoken;
            sessionStorage.setItem("token", x.toString())
            sessionStorage.setItem("loginid", this.objUser.tutorid.toString())
            sessionStorage.setItem("loginEmail", this.objUser.email.toString())
            this.GlobalVariableService.loginUserName = this.objUser.firstname + " " + this.objUser.lastname;
            this.Redirect('carporate/corporateteacherdashboard')
          }
          else {
            var x = rtnData.result.authtoken;
            sessionStorage.setItem("token", x.toString())
            sessionStorage.setItem("loginid", this.objUser.studentid.toString())
            sessionStorage.setItem("loginEmail", this.objUser.email.toString())
            this.GlobalVariableService.loginUserName = this.objUser.firstname + " " + this.objUser.lastname;
            this.Redirect('carporate/corporatestudentdashboard')
          }
          this.toastService.success('Login successful');
        } else {
          this.toastService.error(rtnData.message);
        }
      }, (err) => {
        this.toastService.error("Error occured.");
      });
    }


  }

  Corporate() {
    this.isStudent = false;
    this.isTeacher = false;
    this.iscarporateAccount = true;
  }

  Student() {
    this.isTeacher = false;
    this.iscarporateAccount = false;
    this.isStudent = true;

  }

  Teacher() {
    this.isTeacher = true;
    this.iscarporateAccount = false;
    this.isStudent = false;

  }


  Redirect(url: string) {
    var myurl = `${url}/${''}`;
    const that = this;
    that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      that.router.navigate([myurl])
    );
  }

  onTabSelection($event: any): void {
    this.isTeacher = $event.index === 0;
  }

  handleCaptchaExpire(): void {
    //
  }

  handleCaptchaSuccess(event): void {
    if (event) {
      this.isCaptchaSuccess = true;
    }
  }

  loginWithGoogle(): void {
    console.log('trigger google login');
  }

  loginWithFacebook(): void {
    console.log('trigger facebook login');
  }

  gotoRegistration(): void {
    this.router.navigateByUrl('auth/register');
  }

  private createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      recaptcha: [''],
      rememberMe: [false]
    });
  }
}
