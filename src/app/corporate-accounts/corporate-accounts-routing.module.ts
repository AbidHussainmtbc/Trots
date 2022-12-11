import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateAccountsSigninComponent } from './corporate-accounts-signin/corporate-accounts-signin.component';
import { CorporateAsideMenuComponent } from './corporate-aside-menu/corporate-aside-menu.component';
import { CorporateDashboardComponent } from './corporate-dashboard/corporate-dashboard.component';
import { CorporateScheduleClassesComponent } from './corporate-schedule-classes/corporate-schedule-classes.component';
import { CorporateStudentDashboardComponent } from './corporate-student-dashboard/corporate-student-dashboard.component';
import { CorporateStudentsComponent } from './corporate-students/corporate-students.component';
import { CorporateTeacherDashboardComponent } from './corporate-teacher-dashboard/corporate-teacher-dashboard.component';
import { CorporateTeachersComponent } from './corporate-teachers/corporate-teachers.component';
import { ScheduleLogsComponent } from './schedule-logs/schedule-logs.component';


const routes: Routes = [
  {
    path: '',
    component: CorporateAsideMenuComponent,
    children: [
      {
        path: 'dashboard',
        component: CorporateDashboardComponent
      },
      {
        path: 'students',
        component: CorporateStudentsComponent
      },
      {
        path: 'teachers',
        component: CorporateTeachersComponent
      },
      {
        path: 'scheduleClasses',
        component: CorporateScheduleClassesComponent
      },
      {
        path: 'schedulelogs',
        component: ScheduleLogsComponent
      },
      {
        path: 'corporatestudentdashboard',
        component: CorporateStudentDashboardComponent
      },
      {
        path: 'corporateteacherdashboard',
        component: CorporateTeacherDashboardComponent
      }
    ]
  },
  {
    path: 'login',
    component: CorporateAccountsSigninComponent
  }, 
  // {
  //   path: '',
  //   component: CorporateAccountsSigninComponent
  // }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateAccountsRoutingModule { }
