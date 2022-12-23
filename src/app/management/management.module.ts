import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AccountsComponent } from './accounts/accounts.component';
import { ActiveSessionComponent } from './active-session/active-session.component';
import { AddQuizesComponent } from './add-quizes/add-quizes.component';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ManagementRouting } from './management.routing';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { StudentsComponent } from './students/students.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { TutorCardComponent } from './tutors/tutor-card/tutor-card.component';
import { TutorsComponent } from './tutors/tutors.component';
import { QuizComponent } from '../auth/quiz/quiz.component';
// import { JwPaginationComponent } from 'jw-angular-pagination';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    AdminPanelComponent,
    LoginComponent,
    DashboardComponent,
    TutorsComponent,
    StudentsComponent,
    AccountsComponent,
    ActiveSessionComponent,
    AddQuizesComponent,
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
    AdminAuthComponent,
    QuizComponent,
    // JwPaginationComponent
    TutorCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ManagementRouting,
    NgxPaginationModule
  ]
})

export class ManagementModule { }
