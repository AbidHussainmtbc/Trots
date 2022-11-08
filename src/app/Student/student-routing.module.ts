import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../Twillio/home/home.component';
import { ParticipantsComponent } from '../Twillio/participants/participants.component';
import { RoomsComponent } from '../Twillio/rooms/rooms.component';
import { SettingsComponent } from '../Twillio/settings/settings.component';
import { BookATutorComponent } from './book-atutor/book-atutor.component';
import { InstitutionPageComponent } from './institution-page/institution-page.component';
import { SearchOflineTutorComponent } from './search-ofline-tutor/search-ofline-tutor.component';
import {OnSiteTutorSearchComponent} from './on-site-tutor-search/on-site-tutor-search.component';
import { SearchOnlineTutorComponent } from './search-online-tutor/search-online-tutor.component';
import { StdMainComponentComponent } from './std-main-component/std-main-component.component';
import { StudentAsidmenuComponent } from './student-asidmenu/student-asidmenu.component';
import { StudentClassroomComponent } from './student-classroom/student-classroom.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentLocationComponent } from './student-location/student-location.component';
import { StudentNotificationsComponent } from './student-notifications/student-notifications.component';
import { StudentSignUpComponent } from './student-sign-up/student-sign-up.component';
import { TermConditionsComponent } from './term-conditions/term-conditions.component';
import { SubjectComponent } from './subject/subject.component';
import { StdComplainceComponent } from './std-complaince/std-complaince.component';


const routes: Routes = [
  {
    path: '',
    component: StudentAsidmenuComponent,
    children: [
      {
        path: 'StudentDashboard',
        component: StudentDashboardComponent,
      },
      {
        path: 'StudentClassroom',
        component: StudentClassroomComponent,
      },
      {
        path: 'StudentNotifications',
        component: StudentNotificationsComponent,
      },
      {
        path: 'BookATutor',
        component: BookATutorComponent,
      },
      {
        path: 'SearchOnlineTutor',
        component: SearchOnlineTutorComponent,
      },
      {
        path: 'Subject',
        component: SubjectComponent,
      }
      ,
      {
        path: 'searchOflineTutor',
        component: SearchOflineTutorComponent,
      },
      {
        path: 'OnSiteTutorSearch',
        component: OnSiteTutorSearchComponent
      },

      { path: 'Home', component: HomeComponent },
  { path: 'Rooms', component: RoomsComponent },
  { path: 'Setting', component: SettingsComponent },
  {path:'Participants', component: ParticipantsComponent}

  // { path: 'Trots', component: TrotsComponent },
      // { path: 'Home', component: HomeComponent },
      // { path: 'Rooms', component: RoomsComponent },
      // { path: 'Setting', component: SettingsComponent },
      // { path:'Participants', component: ParticipantsComponent}
    
    ]
  },
  {
    path: 'Reg',
    component: StdMainComponentComponent,
    children: [
      {
        path: 'StudentSignUp',
        component: StudentSignUpComponent
      }
      , {
        path: 'Institution',
        component: InstitutionPageComponent
      }
      , {
        path: 'StudentLocation',
        component: StudentLocationComponent
      }
      , {
        path: 'TermConditions',
        component: TermConditionsComponent
      }
      , {
        path: 'StdComplaince',
        component: StdComplainceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
