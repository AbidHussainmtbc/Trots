import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { AgreementComponent } from './agreement/agreement.component';
import { AuthMainComponent } from './auth-main/auth-main.component';
import { InstitutionInfoComponent } from './institution-info/institution-info.component';
import { LocationComponent } from './location/location.component';
import { LoginComponent } from './login/login.component';
import { QuestionnairesComponent } from './questionnaires/questionnaires.component';
import { RegisterComponent } from './register/register.component';
import { SubjectInformationComponent } from './subject-information/subject-information.component';
import{ComplianceComponent} from './compliance/compliance.component'
const routes: Routes = [
  {
    path: '',
    component: AuthMainComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'user-loc',
        component: LocationComponent
      },
      {
        path: 'institute',
        component: InstitutionInfoComponent
      },
      {
        path: 'subjects',
        component: SubjectInformationComponent
      },
      {
        path: 'attempt-test',
        component: QuestionnairesComponent
      },
      {
        path: 'agreement',
        component: AgreementComponent
      }
      ,
      {
        path: 'Compliance',
        component: ComplianceComponent
      },
      
      {
        path: 'quiz',
        component: QuizComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRouting {
}
