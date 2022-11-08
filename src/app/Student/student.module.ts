import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { StudentRoutingModule } from './student-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AgmCoreModule } from '@agm/core';
import { BookATutorComponent } from './book-atutor/book-atutor.component';
import { SearchOflineTutorComponent } from './search-ofline-tutor/search-ofline-tutor.component';
import { SearchOnlineTutorComponent } from './search-online-tutor/search-online-tutor.component';
import { StudentAsidmenuComponent } from './student-asidmenu/student-asidmenu.component';
import { StudentNotificationsComponent } from './student-notifications/student-notifications.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentClassroomComponent } from './student-classroom/student-classroom.component';
import { StudentSignUpComponent } from './student-sign-up/student-sign-up.component';
import { InstitutionPageComponent } from './institution-page/institution-page.component';
import { StudentLocationComponent } from './student-location/student-location.component';
import { TermConditionsComponent } from './term-conditions/term-conditions.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { StdMainComponentComponent } from './std-main-component/std-main-component.component';
import { SettingsComponent } from '../Twillio/settings/settings.component';
import { ParticipantsComponent } from '../Twillio/participants/participants.component';
import { RoomsComponent } from '../Twillio/rooms/rooms.component';
import { HomeComponent } from '../Twillio/home/home.component';
import { CameraComponent } from '../Twillio/camera/camera.component';
import { DeviceSelectComponent } from '../Twillio/settings/device-select.component';
import { DeviceService } from '../shared/services/device.service';
import { VideoChatService } from '../shared/services/videochat.service';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { OnSiteTutorSearchComponent } from './on-site-tutor-search/on-site-tutor-search.component';
import { SubjectComponent } from './subject/subject.component';
import { FormsModule } from '@angular/forms';
import { StdComplainceComponent } from './std-complaince/std-complaince.component';

@NgModule({
  declarations: [BookATutorComponent,SearchOflineTutorComponent,SearchOnlineTutorComponent,StudentAsidmenuComponent,StudentClassroomComponent,StudentDashboardComponent,StudentNotificationsComponent, 
    StudentSignUpComponent, InstitutionPageComponent, StudentLocationComponent,SubjectComponent, 
    TermConditionsComponent, StdMainComponentComponent, OnSiteTutorSearchComponent,OnSiteTutorSearchComponent, SubjectComponent, StdComplainceComponent
    
  
    // HomeComponent,
    // RoomsComponent,
    // ParticipantsComponent,
    // CameraComponent,
    // SettingsComponent,        
    // DeviceSelectComponent,
    // ActivityIndicatorComponent,
    // TrotsComponent
  
  ],
  imports: [
   //BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    CommonModule,
    SharedModule,
    FormsModule,
    NgxCaptchaModule,
    StudentRoutingModule,
    AgmCoreModule,
    CalendarModule
  ],
  providers: [
    //DeviceService, VideoChatService
    // , StorageService
  ],
})
export class StudentModule { }
