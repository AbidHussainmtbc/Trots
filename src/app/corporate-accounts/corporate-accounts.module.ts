import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporateAccountsRoutingModule } from './corporate-accounts-routing.module';
import { CorporateAccountsSigninComponent } from './corporate-accounts-signin/corporate-accounts-signin.component';
import { CorporateDashboardComponent } from './corporate-dashboard/corporate-dashboard.component';
import { CorporateStudentsComponent } from './corporate-students/corporate-students.component';
import { CorporateTeachersComponent } from './corporate-teachers/corporate-teachers.component';
import { CorporateScheduleClassesComponent } from './corporate-schedule-classes/corporate-schedule-classes.component';
import { ScheduleLogsComponent } from './schedule-logs/schedule-logs.component';
import { CorporateAsideMenuComponent } from './corporate-aside-menu/corporate-aside-menu.component';
import { SharedModule } from '../shared/shared.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AddComponent } from './add/add.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CorporateStudentDashboardComponent } from './corporate-student-dashboard/corporate-student-dashboard.component';
import { CorporateTeacherDashboardComponent } from './corporate-teacher-dashboard/corporate-teacher-dashboard.component';
// import { ScheduleClassesModalComponent } from './schedule-classes-modal/schedule-classes-modal.component';
@NgModule({
  declarations: [
    CorporateAccountsSigninComponent,
    CorporateDashboardComponent,
    CorporateStudentsComponent,
    CorporateTeachersComponent,
    CorporateScheduleClassesComponent,
    ScheduleLogsComponent,
    CorporateAsideMenuComponent,
    AddComponent,
    CorporateStudentDashboardComponent,
    CorporateTeacherDashboardComponent,
    // ScheduleClassesModalComponent,
  
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxCaptchaModule,
    AgmCoreModule, 
    FormsModule,
    NgxCaptchaModule,
    CalendarModule,   
    CorporateAccountsRoutingModule,
    NgCircleProgressModule,
    NgbModule
  ],
  entryComponents: [],
})
export class CorporateAccountsModule { }
