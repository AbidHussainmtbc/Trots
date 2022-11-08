import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import cors from 'cors';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  envData;

  constructor(private httpClient: HttpClient) {
    this.envData = environment;
  }

  getAllClasses(): Observable<any> {
    try {
      const headers = {
        'content-type': 'application/json',
        apikey: this.envData.apiAccessKey
      };

      const url = `${this.envData.apiConn}Subject/getclasses`;

      return this.httpClient.get(url, {headers});
    } catch (e) {
      console.log('Error', e);
    }
  }


  getsubjectswithcategories(): Observable<any> {
    try {
      const headers = {
        'content-type': 'application/json',
        apikey: this.envData.apiAccessKey
      };

      const url = `${this.envData.apiConn}Subject/getsubjectswithcategories?classid=-1`;

      return this.httpClient.get(url, {headers});
    } catch (e) {
      console.log('Error', e);
    }
  }

  getAllSubjects(): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      apikey: this.envData.apiAccessKey
    };

    const url = `${this.envData.apiConn}Subject/getsubjects?classid=-1`;

    return this.httpClient.get(url, {headers});
  }

  getCountriesList(): Observable<any> {
    try {
      console.log('get data of countries from API');
      const headers = {
        'content-type': 'application/json',
        apikey: this.envData.apiAccessKey
      };
      const url = `${this.envData.apiConn}Country/getall`;

      console.log('url', url);
      return this.httpClient.get(url, {headers});
    } catch (err) {
      console.log('Error while retrieving data', err);
    }
  }

  postCertificate(dataParam): Observable<any> {
    try {
      const url = `${this.envData.apiConn}Document/uploadtutorcertificate`;
      const formData = new FormData();
      formData.append('apikey', this.envData.apiAccessKey);
      formData.append('userguid', localStorage.getItem('regUserGuid'));
      formData.append('certifcatefile', dataParam.document);
      formData.append('classid', dataParam.classInfo.id);
      formData.append('subjectid', dataParam.subjectInfo.id);

      return this.httpClient.post(url, formData);
    } catch (e) {
      console.log('Error', e);
    }
  }

  postFile(dataParam): Observable<any> {
    try {
      const url = `${this.envData.apiConn}Document/uploadeducationaldocument`;
      const formData = new FormData();
      formData.append('apikey', this.envData.apiAccessKey);
      formData.append('userguid', localStorage.getItem('regUserGuid'));
      formData.append('institutetype', dataParam.institute.name);
      formData.append('passingyear', dataParam.passYear);
      formData.append('documentfile', dataParam.certificateInfo);

      return this.httpClient.post(url, formData);
    } catch (e) {
      console.log('Error', e);
    }
  }

  fnAddEducationalInfo(instituteData: any[]): any {
    try {
      const educationInfo = [];
      instituteData.forEach((rec: any) => {
        educationInfo.push({ instituetype: rec.institute.value, institutename: rec.orgName, passingyear: Number(rec.passYear), grade: Number(rec.grade), percentage: Number(rec.percentage), documentpath: rec.documentPath
        });
      });

      const url = 'SignUp/tutor/educationinfo';
      const body = {
        apikey: this.envData.apiAccessKey,
        userguid: localStorage.getItem('regUserGuid'),
        educationinformation: educationInfo
      };

      return this.generateHttpRequest(url, body);
    } catch (e) {
      console.log('Error while saving tutor location info', e);

      return false;
    }
  }


  Add_Std_EducationalInfo(instituteData: any[]): any {
    try {
      const educationInfo = [];
      instituteData.forEach((rec: any) => {
        educationInfo.push({ instituetype: rec.institute.value, institutename: rec.orgName, passingyear: Number(rec.passYear), grade: Number(rec.grade), percentage: Number(rec.percentage), documentpath: rec.documentPath
        });
      });

      const url = 'Student/addupdatestudenteducationalinfo';
      const body = {
        apikey: this.envData.apiAccessKey,
        userguid: localStorage.getItem('regUserGuid'),
        educationinformation: educationInfo
      };

      return this.generateHttpRequest(url, body);
    } catch (e) {
      console.log('Error while saving tutor location info', e);

      return false;
    }
  }


  fnAddSubjectInfo(subjectsData: any[]): any {
    debugger;
    try {
      const subjectInfo = [];
      subjectsData.forEach((sub: any) => {
        subjectInfo.push({
          classid: sub.classInfo.id,
          subjectid: sub.subjectInfo.id,
          experience: sub.experience,
          subjectfee: sub.subjectfee,
          documentpath: sub.documentpath,
          // documentpath: sub.documentPath,
          timefrom: sub.timefrom,
          timeto: sub.timeto
        });
      });

      const url = 'SignUp/tutor/subjectinfo';
      const body = {
        apikey: this.envData.apiAccessKey,
        userguid: localStorage.getItem('regUserGuid'),
        subjectinformation: subjectInfo
      };

      return this.generateHttpRequest(url, body);
    } catch (e) {
      console.log('Error while saving subjects', e);
    }
  }

  generateHttpRequest(urlParam: string, body: any): any {
    debugger;
    try {
      const headers = {'content-type': 'application/json'};
      const url = `${this.envData.apiConn}${urlParam}`;

      return this.httpClient.post(url, body, {headers});
    } catch (e) {
      console.log('error', e);

      return false;
    }
  }
  adminLogin(formValue: any, isAdminLogin, isTutor): any {
    try {
      let url = 'SignIn/admin';
      formValue.apikey= this.envData.apiAccessKey;
      return this.generateHttpRequest(url, formValue);
    } catch (e) {
      console.log('Error while attempting to login', e);
      return false;
    }
  }
  fnLoginUser(formValue: any, isAdminLogin, isTutor): any {
    try {
      let url = '';

      // tslint:disable-next-line:prefer-conditional-expression
      if (!isAdminLogin) {
        url = isTutor ? 'SignIn/tutor' : 'SignIn/student';
      } else {
        url = 'SignIn/tutor';
      }
      formValue.apikey= this.envData.apiAccessKey;
      // const body = {
      //   apikey: this.envData.apiAccessKey,
      //   email: formValue.loginEmail,
      //   password: formValue.loginPassword
      // };

      return this.generateHttpRequest(url, formValue);
    } catch (e) {
      console.log('Error while attempting to login', e);

      return false;
    }
  }

  fnRegisterUser(formData: any, isTutor: boolean): any {
    try {
      console.log('attempting to save basic info');
      const url = isTutor ? 'SignUp/tutor/basicinfo' : 'SignUp/student/basicinfo';
      const body = {
        apikey: this.envData.apiAccessKey,
        email: formData.userEmail,
        password: formData.userPassword,
        firstname: formData.firstName,
        lastname: formData.lastName,
        mobile: `${formData.countryCode}${formData.phoneNumber}`
      };

      return this.generateHttpRequest(url, body);
    } catch (e) {
      console.log('Error while registering user', e);

      return false;
    }
  }

  fnSaveTutorLocationInfo(formData: any): any {
    try {
      const url = 'SignUp/tutor/addtutoringinfo';
      const body = {
        apikey: this.envData.apiAccessKey,
        userguid: localStorage.getItem('regUserGuid'),
        tutoringmode: formData.mode,
        tutortype: formData.type,
        country: formData.country,
        address: formData.address,
        latitude: formData.latitude,
        longitude: formData.longitude
      };

      return this.generateHttpRequest(url, body);
    } catch (e) {
      console.log('Error while saving tutor location info');

      return false;
    }
  }

  fnSaveStudentLocationInfo(formData: any): any {
    try {
      const url = 'SignUp/student/educationinfo';
      debugger;
      const body = {
        apikey: this.envData.apiAccessKey,
        classid:"2",
        userguid: localStorage.getItem('regUserGuid'),
        institutename: sessionStorage.getItem("institutename"),
        learningmode: formData.mode,
        // tutortype: formData.type,
        country: formData.country,
        address: formData.address,
        latitude: formData.latitude,
        longitude: formData.longitude
      };

      return this.generateHttpRequest(url, body);
    } catch (e) {
      console.log('Error while saving tutor location info');

      return false;
    }
  }

  Get(str:any): Observable<any> {
    try {
      const headers = {
        'content-type': 'application/json',
        apikey: this.envData.apiAccessKey
      };

      const url = `${this.envData.apiConn}Tutor/upcomingjobs`;

      return this.httpClient.get(url, {headers});
    } catch (e) {
      console.log('Error', e);
    }
  }

  get(value: any, paramName: string, UrlName: string,pagenumber: number = 1,pagesize:number = 15): Observable<any> {
    debugger;
    var token = sessionStorage.getItem("token");
    const headers = {
      'content-type': 'application/json',
      apikey: this.envData.apiAccessKey,
      'Authorization': 'Bearer ' + token
    };

    var url = `${this.envData.apiConn}`;
    url = url + UrlName+"/"+value;
    // let Parameter = new HttpParams().set("pagenumber", pagenumber.toString()
    // .set
    const Parameter = new HttpParams().set('pagenumber',pagenumber.toString() )
   .set('pagesize', pagesize.toString())

    return this.httpClient.get(url ,   { params: Parameter ,  headers: headers } )
  }

noParam_GetDetails_pagination(UrlName: string ,PnoVariableName: string,PsizeVariableName:string,  pagenumber: number = 1,pagesize:number = 15): Observable<any> {
  var token = sessionStorage.getItem("token");
  const headers = {
    'content-type': 'application/json',
    apikey: this.envData.apiAccessKey,
    'Authorization': 'Bearer ' + token
  };
  const Parameter = new HttpParams().set(PnoVariableName,pagenumber.toString() )
  .set(PsizeVariableName, pagesize.toString())

  var url = `${this.envData.apiConn}`;
  var Url = url + UrlName;
  return this.httpClient.get(Url ,{ params: Parameter ,  headers: headers }  );
}


  GetDetails(UrlName: string): Observable<any> {
    var token = sessionStorage.getItem("token");
    const headers = {
      'content-type': 'application/json',
      apikey: this.envData.apiAccessKey,
      'Authorization': 'Bearer ' + token
    };

    var url = `${this.envData.apiConn}`;
    var Url = url + UrlName;
    return this.httpClient.get(Url ,{headers: headers } );
  }
  //Get with Parameter
  get_noPagination(value: any, paramName: string, UrlName: string): Observable<any> {
    debugger;
    var token = sessionStorage.getItem("token");
    const headers = {
      'content-type': 'application/json',
      apikey: this.envData.apiAccessKey,
      'Authorization': 'Bearer ' + token
    };

    var url = `${this.envData.apiConn}`;
    url = url + UrlName;
    // let Parameter = new HttpParams().set("pagenumber", pagenumber.toString()
    // .set
    const Parameter = new HttpParams().set(paramName,value.toString() )

    return this.httpClient.get(url ,   { params: Parameter ,  headers: headers } )
  }

  post(value: any, UrlName: string): Observable<any> {
    debugger;
    var token = sessionStorage.getItem("token");
    const headers = {
      'content-type': 'application/json',
      apikey: this.envData.apiAccessKey,
      'Authorization': 'Bearer ' + token
    };
    // value.apikey = this.envData.apiAccessKey;
    var url = `${this.envData.apiConn}`;
    url = url + UrlName;
    return this.httpClient.post(url ,value ,  {  headers: headers } )
  }

  put(value: any, UrlName: string): Observable<any> {
    debugger;
    // var token = sessionStorage.getItem("token");
    // const headers = {
    //   'content-type': 'application/json',
    //   apikey: this.envData.apiAccessKey,
    //   'Authorization': 'Bearer ' + token
    // };
    value.apikey = this.envData.apiAccessKey;
    var url = `${this.envData.apiConn}`;
    url = url + UrlName;
    return this.httpClient.put(url ,value 
      //,  {  headers: headers }
       )
  }


  ///tawillio APIS
  tawillio_Room(value: any, UrlName: string): Observable<any> {
    debugger;
    // var token = sessionStorage.getItem("token");
    const headers = {
      'content-type': 'application/json'
    };
    // var token =  sessionStorage.getItem("token");
    // value.authtoken = token;
    var url = `${this.envData.apiConn}`;
    url = url + UrlName;
    return this.httpClient.post(url ,value ,  {  headers: headers } )
 
  }

}
