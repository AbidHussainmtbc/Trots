import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastService } from 'src/app/services/toast.service';
import { UtilsService } from 'src/app/services/utils.service';
// tslint:disable-next-line:ban-ts-ignore
// @ts-ignore
import * as countryList from '../../../assets/country-codes.json';

@Component({
  selector: 'app-student-sign-up',
  templateUrl: './student-sign-up.component.html',
  styleUrls: ['./student-sign-up.component.scss']
})
export class StudentSignUpComponent implements OnInit {

  profileForm: FormGroup;

  isLoading = false;
  showPassword = false;
  shoeConfirmPass = false;
  countries = [];

  selCountry;

  constructor(
    private formBuilder: FormBuilder, private router: Router, private toastService: ToastService,
    private utilsService: UtilsService, private apiService: ApiServiceService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.createProfileForm();
    console.log('Attempting to get data of countries');
    const countryData = await this.apiService.getCountriesList().toPromise();

    this.countries = countryData.result;
    this.countries.forEach(item => {
      const countryIdx = (countryList.default).findIndex(currItem => currItem.name === item.name);

      if (countryIdx > -1) {
        item.dial_code = (countryList.default)[countryIdx].dial_code;
        item.flagSrc = `https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${(countryList.default)[countryIdx].code}.svg`;
      }
    });

    this.selCountry = this.countries[1];
    this.profileForm.controls.countryCode.setValue(this.selCountry.dial_code);
    localStorage.setItem('regUserCountry', this.selCountry.name);
  }

  signUp(): void {
    debugger;

    // this.router.navigateByUrl('std/Reg/Institution');
    // return

    if (this.checkValidation()) {
      // alert('test')
      this.isLoading = true;
      this.apiService.fnRegisterUser(this.profileForm.value, false).subscribe(rtnData => {
        this.isLoading = false;
        debugger;
        if (rtnData.statuscode === 200) {
          console.log('navigate to respective location');
          localStorage.setItem('regUserGuid', rtnData.userguid);

          this.router.navigateByUrl('std/Reg/Institution');
        } else {
          this.toastService.error(rtnData.message);
        }
      });
    }
  }
  checkValidation() {
    if (this.isNullOrEmpty(this.profileForm.value.firstName)) {
      this.toastService.error("Please enter First Name.");
      return false;
    }
    else if (this.isNullOrEmpty(this.profileForm.value.lastName)) {
      this.toastService.error("Please enter Last Name.");
      return false;
    }
    else if (this.isNullOrEmpty(this.profileForm.value.countryCode)) {
      this.toastService.error("Please enter country code.");
      return false;
    }


    else if (this.isNullOrEmpty(this.profileForm.value.phoneNumber)) {
      this.toastService.error("Please enter phone number.");
      return false;
    }
    else if (this.isNullOrEmpty(this.profileForm.value.userEmail)) {
      this.toastService.error("Please enter user email.");
      return false;
    }
    else if (this.isNullOrEmpty(this.profileForm.value.userPassword)) {
      this.toastService.error("Please enter Password");
      return false;
    }
    else if (this.isNullOrEmpty(this.profileForm.value.confirmPassword)) {
      this.toastService.error("Please enter Confirm Password");
      return false;
    }
    else {
      return true;
    }
  }

  isNullOrEmpty(str: string) {
    if (str == "" || str == undefined || str == null) {
      return true;
    }
    else {
      return false;
    }
  }
  gotoLogin(): void {
    this.router.navigateByUrl('main');
  }

  setCountryDialCode(selCountry): void {
    this.selCountry = selCountry.value;
    this.profileForm.get('countryCode').setValue(this.selCountry.dial_code);
    localStorage.setItem('regUserCountry', this.selCountry.label);
  }

  private createProfileForm(): void {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      countryCode: [''],
      phoneNumber: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

}
