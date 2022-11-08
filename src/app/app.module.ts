import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularSvgIconModule } from 'angular-svg-icon';
// import { NgChartsModule } from 'ng2-charts';
import { DialogService } from 'primeng';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from './services/base.component';
import { LanguageTranslateService } from './services/language-translate.service';
import { HomeComponent } from './Twillio/home/home.component';
import { RoomsComponent } from './Twillio/rooms/rooms.component';
import { ParticipantsComponent } from './Twillio/participants/participants.component';
import { CameraComponent } from './Twillio/camera/camera.component';
import { SettingsComponent } from './Twillio/settings/settings.component';
import { DeviceSelectComponent } from './Twillio/settings/device-select.component';
import { DeviceService } from './shared/services/device.service';
import { VideoChatService } from './shared/services/videochat.service';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
@NgModule({
  declarations: [
    AppComponent,
    // BaseComponent,
    HomeComponent,
    RoomsComponent,
    ParticipantsComponent,
    CameraComponent,
    SettingsComponent,
    DeviceSelectComponent,
    // ActivityIndicatorComponent,
  ],
  imports: [
    // CommonModule, 

    FormsModule,
    BrowserModule,
    AppRoutingModule,    
    HttpClientModule,
    BrowserAnimationsModule,
    // AgmCoreModule.forRoot({
    //  apiKey: 'AIzaSyCESelr24rnz4FtxqD86-2lMZjG5sFePGc'
    // }),

    // SAIT
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyBjgJb7VIVMFRG0VZ5_LDhlWMhDSVnem0E'//AIzaSyBjgJb7VIVMFRG0VZ5_LDhlWMhDSVnem0E //'AIzaSyAlLOyvX48YFpF-bAdeUHEbDbe4aOPO2H0'
      }),
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularSvgIconModule.forRoot(),
    HttpClientModule,
    SharedModule,
    NgbModule
  ],
  providers: [
    DialogService,
    MessageService,
    ConfirmationService,
    LanguageTranslateService,
    DeviceService, VideoChatService
    // , StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
