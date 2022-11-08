import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsideMenuComponent } from './aside-menu/aside-menu.component';
import { TutorClassRoomComponent } from './tutor-class-room/tutor-class-room.component';
import { TutorDashboardComponent } from './tutor-dashboard/tutor-dashboard.component';
import { TutorLecturesComponent } from './tutor-lectures/tutor-lectures.component';
import { EarningComponent } from './earning/earning.component';
import { RatingComponent } from './rating/rating.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { HomeComponent } from '../Twillio/home/home.component';
import { RoomsComponent } from '../Twillio/rooms/rooms.component';
import { SettingsComponent } from '../Twillio/settings/settings.component';
import { ParticipantsComponent } from '../Twillio/participants/participants.component';

const routes: Routes = [
  {
    path: '',
    component: AsideMenuComponent,
    children: [
      {
        path: 'TutorClassRoom',
        component: TutorClassRoomComponent,
      }, {
        path: 'TutorDashboard',
        component: TutorDashboardComponent,
      }, {
        path: 'TutorLectures',
        component: TutorLecturesComponent,
      }
      , {
        path: 'Earning',
        component: EarningComponent,
      }
      , {
        path: 'Rating',
        component: RatingComponent,
      }
      , {
        path: 'Subjects',
        component: SubjectsComponent,
      },
      { path: 'Home', component: HomeComponent },
      { path: 'Rooms', component: RoomsComponent },
      { path: 'Setting', component: SettingsComponent },
      {path:'Participants', component: ParticipantsComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorRoutingModule { }
