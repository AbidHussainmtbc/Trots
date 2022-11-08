import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Classes/user';
import { ApiServiceService } from '../../services/api-service.service';
import { ToastService } from '../../services/toast.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  isTeacher = true;
  isLoading = false;
  isCaptchaSuccess = false;
  password;
  objUser: User;

  show = false;
 // siteKey = 'AIzaSyDwaCSdaDLWeGbO6qaSdNKjgQvZPpHI3-I';
 siteKey: 'AIzaSyCESelr24rnz4FtxqD86-2lMZjG5sFePGc'
  constructor(
    private formBuilder: FormBuilder, private router: Router, private toastService: ToastService,
    private utilsService: UtilsService, private apiService: ApiServiceService) {
  this.objUser = new User;
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
    debugger;
    if (this.loginForm.invalid) {
      return this.utilsService.validateAllFormFields(this.loginForm);
    }

    const formValue = this.loginForm.value;
    this.isLoading = true;

    this.apiService.adminLogin(formValue, false, this.isTeacher).subscribe(rtnData => {
      console.log('rtnData', rtnData);
      this.isLoading = false;
      debugger;
      if (rtnData.statuscode === 200) {
        debugger;
        this.objUser = rtnData.result;
        console.log('navigate to respective dashboard');
          var x = rtnData.result.authtoken;
          sessionStorage.setItem("token",x.toString())
          sessionStorage.setItem("loginid",this.objUser.id.toString())
          sessionStorage.setItem("object",JSON.stringify(this.objUser))
          this.Redirect('manage/dashboard')
        this.toastService.success('Login successful');
      } else {
        this.toastService.error(rtnData.message);
      }
    });
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
