import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorRoutingModule } from './tutor-routing.module';
import { AsideMenuComponent } from './aside-menu/aside-menu.component';
import { RatingComponent } from './rating/rating.component';
import { EarningComponent } from './earning/earning.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'primeng';
import { TutorDashboardComponent } from './tutor-dashboard/tutor-dashboard.component';
import { AgmCoreModule } from '@agm/core';
import { TutorClassRoomComponent } from './tutor-class-room/tutor-class-room.component';
import { TutorLecturesComponent } from './tutor-lectures/tutor-lectures.component';

// import {  NgChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [AsideMenuComponent,RatingComponent,EarningComponent,SubjectsComponent, TutorClassRoomComponent ,TutorLecturesComponent  ,TutorDashboardComponent ],
  imports: [
    TutorRoutingModule,
    CommonModule,
    SharedModule,
    AgmCoreModule,
    // NgChartsModule
  ]
})
export class TutorModule { }
