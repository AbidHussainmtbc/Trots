import { AfterViewInit, Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Classes/user';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastService } from 'src/app/services/toast.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { LanguageTranslateService } from 'src/app/services/language-translate.service';
import { BaseComponent } from 'src/app/services/base.component';
import { GlobalVariableService } from 'src/app/services/global-variable.service';
import { Subscription } from 'rxjs';
import { VideoChatService } from 'src/app/shared/services/videochat.service';
// import { BaseComponent } from '@fullcalendar/core';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent
  extends BaseComponent implements OnInit, AfterViewInit {
    // private subscription: Subscription;

  showSideBar = false;
  selectedTab: string = '1';

  loginForm: FormGroup;

  isTeacher = true;
  isLoading = false;
  isCaptchaSuccess = false;
  password;
  objUser: User;
  objloginClass: loginClass;
  show = false;
  test: string = "/assets/images/backg.png";
  // siteKey = 'AIzaSyDwaCSdaDLWeGbO6qaSdNKjgQvZPpHI3-I';
  siteKey: 'AIzaSyCESelr24rnz4FtxqD86-2lMZjG5sFePGc'
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  event_list = [
    {
      event: ' Event 1',
      eventLocation: '',
      eventDescription: 'TROTS primarily focuses on bringing the Students and Tutors for an interactive session using its SaaS (Software as a Service) platform.',
      img: 'https://picsum.photos/400/300?random&t=1',
      // eventStartDate: new Date('2019/05/20'),
      // eventEndingDate: new Date('2019/05/24')
    },
    {
      event: ' Event 2',
      eventLocation: '',
      eventDescription: 'In order to enhance the educational standards, improving conventional methods of educating individuals, increase productivity by ease of learning and improved experience of interconnectivity between Students and Tutors, TROTS offers Remote / Online and Onsite learning feature for its end-users.',
      img: 'https://picsum.photos/400/300?random&t=1',
      // eventStartDate: new Date('2019/05/20'),
      // eventEndingDate: new Date('2019/05/24')
    },
    {
      event: ' Event 3',
      eventLocation: '',
      eventDescription: 'A Student can opt a particular Tutor based on search criteria as per desired needs, requirements and availability time-slot for E-Learning. TROTS hold a database of registered and verified Tutors, who are competitive and willing to offer / lend their services to aspiring students.',
      img: 'https://picsum.photos/400/300?random&t=1',
      // eventStartDate: new Date('2019/05/20'),
      // eventEndingDate: new Date('2019/05/24')
    }
  ]

  //  upcoming_events =  this.event_list.filter( event => event.eventStartDate > new Date());
  //  past_events = this.event_list.filter(event => event.eventEndingDate < new Date());
  //  current_events =  this.event_list.filter( event => (event.eventStartDate >= new Date() && (event.eventEndingDate <= new Date())))
  cards = [
    {
      title: 'Card Title 1',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).webp'
    },
    {
      title: 'Card Title 2',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).webp'
    },
    {
      title: 'Card Title 3',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).webp'
    },
    {
      title: 'Card Title 4',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).webp'
    },
    {
      title: 'Card Title 5',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).webp'
    },
    {
      title: 'Card Title 6',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).webp'
    },
    {
      title: 'Card Title 7',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).webp'
    },
    {
      title: 'Card Title 8',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).webp'
    },
    {
      title: 'Card Title 9',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).webp'
    },
  ];
  slides: any = [[]];
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  // offvideo(){
  //   this.subscription =
  //   this.videoChatService
  //       .$roomsUpdated
  //       .subscribe();
  // }
  
  ngOnInit() {
    // if (this.subscription) {
    //   alert("switch off")
    //   this.offvideo();
    //   this.subscription.unsubscribe();
    // }
    // alert('clear')
    sessionStorage.clear();
    this.slides = this.chunk(this.cards, 3);
    this.changeLanguage('en');
  }
  constructor(public languageTranslateService: LanguageTranslateService, private router: Router, private toastService: ToastService,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService, 
    private GlobalVariableService :GlobalVariableService, private apiService: ApiServiceService,
    // private readonly videoChatService: VideoChatService
  ) {
    super(languageTranslateService);
    
    this.objUser = new User;
    this.objloginClass = new loginClass();

  }


  ngAfterViewInit(): void {
    // document.querySelector('.nav_home').classList.add('active');

    // window.onscroll = event => {
    //   if (event.path[1].window.pageYOffset < 600) {
    //     this.navItemSelected('.nav_home');
    //   }

    //   if (event.path[1].window.pageYOffset > 600 && event.path[1].window.pageYOffset < 900) {
    //     this.navItemSelected('.nav_contact');
    //   }

    //   if (event.path[1].window.pageYOffset > 900 && event.path[1].window.pageYOffset < 2400) {
    //     this.navItemSelected('.nav_privacy_policy');
    //   }

    //   if (event.path[1].window.pageYOffset > 2400) {
    //     this.navItemSelected('.nav_terms_and_conditions');
    //   }
    // }
    ;
  }

  swalpop() {
    swal(
      "Countinue as ", {
      buttons: ["Tutor", "Student"]
    })
      .then((willDelete) => {
        debugger;
        if (willDelete) {
          this.navigateToUrl('StudentSignUp')
        } else {
          this.navigateToUrl('register')
        }
      });
  }

  navigateToUrl(userLoc: string): void {
    this.router.navigateByUrl(`auth/${userLoc}`);
  }
  navItemSelected(item: string, num: string): void {
    // this.showSideBar = !this.showSideBar; 
    const activeLinkItem = document.querySelector('.active');
    if (activeLinkItem) {
      activeLinkItem.classList.remove('active');
    }
    document.querySelector(item).classList.add('active');
    this.selectedTab = num;
    this.blockBodyScroll();

  }

  blockBodyScroll(): void {
    this.showSideBar = !this.showSideBar;

    const bodyTag = document.querySelector('body');

    this.showSideBar ? bodyTag.classList.add('block-body-scroll') : bodyTag.classList.remove('block-body-scroll');
  }
  ////////Login
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
  selectedType(type: any) {
    if (type == "Tutor") {
      this.isTeacher = true;
    }
    else {
      this.isTeacher = false;;
    }
  }
  signIn(): void {
    debugger;

    //     if(this.isTeacher){
    //       // var x = rtnData.result.authtoken;
    //       // sessionStorage.setItem("token",x.toString())
    //       // sessionStorage.setItem("loginid",this.objUser.tutorid.toString())
    //       this.Redirect('tutor/TutorDashboard')
    //     }
    //     else{
    //       // var x = rtnData.result.authtoken;
    //       // sessionStorage.setItem("token",x.toString())
    //       // sessionStorage.setItem("loginid",this.objUser.tutorid.toString())
    //       this.Redirect('std/StudentDashboard')
    //     }
    // return;
    this.apiService.fnLoginUser(this.objloginClass, false, this.isTeacher).subscribe(rtnData => {
      console.log('rtnData', rtnData);
      this.isLoading = false;
      debugger;

      if (rtnData.statuscode === 200) {
        debugger;
        this.objUser = rtnData.result;
        console.log('navigate to respective dashboard');

        // var x = rtnData.result.authtoken;
        // sessionStorage.setItem("token",x.toString())
        // sessionStorage.setItem("loginid",this.objUser.tutorid.toString())
        // this.Redirect('manage/dashboard')
        if (this.isTeacher) {
          var x = rtnData.result.authtoken;
          sessionStorage.setItem("token", x.toString())
          sessionStorage.setItem("loginid", this.objUser.tutorid.toString())
          sessionStorage.setItem("loginEmail", this.objUser.email.toString())
          this.GlobalVariableService.loginUserName =this.objUser.firstname + " " + this.objUser.lastname;
          this.Redirect('tutor/TutorDashboard')
        }
        else {
          var x = rtnData.result.authtoken;
          sessionStorage.setItem("token", x.toString())
          sessionStorage.setItem("loginid", this.objUser.studentid.toString())
          sessionStorage.setItem("loginEmail", this.objUser.email.toString())
          this.GlobalVariableService.loginUserName =this.objUser.firstname + " " + this.objUser.lastname;
          this.Redirect('std/StudentDashboard')
        }
        this.toastService.success('Login successful');
      } else {
        this.toastService.error(rtnData.message);
      }
    }, (err) => {
      this.toastService.error( "Error occured.");
    });
  }

  changeLanguage(type: any) {
    if (type == "ar") {
      this.languageTranslateService.setLang('ar');
    }
    if (type == "ur") {
      this.languageTranslateService.setLang('ur');
    }
    if (type == "en") {
      this.languageTranslateService.setLang('en');
    }


  }

}


export class loginClass {
  apikey: string;
  email: string;
  password: string;

  /**
   *
   */
  constructor() {
    this.apikey = "";
    this.email = "";
    this.password = "";

  }
}