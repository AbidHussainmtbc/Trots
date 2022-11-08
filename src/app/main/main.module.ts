import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from 'angular-responsive-carousel';
import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { MainPrivacyPolicyComponent } from './main-privacy-policy/main-privacy-policy.component';
import { MainTermsAndConditionsComponent } from './main-terms-and-conditions/main-terms-and-conditions.component';
import { MainRouting } from './main.routing';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    ContactComponent,
    MainPrivacyPolicyComponent,
    MainTermsAndConditionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainRouting,
    NgbModule,
  ]
})
export class MainModule {
}
