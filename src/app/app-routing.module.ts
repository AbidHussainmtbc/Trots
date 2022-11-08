import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { StudentClassroomComponent } from './Student/student-classroom/student-classroom.component';
import { HomeComponent } from './Twillio/home/home.component';
import { ParticipantsComponent } from './Twillio/participants/participants.component';
import { RoomsComponent } from './Twillio/rooms/rooms.component';
import { SettingsComponent } from './Twillio/settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
 // { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'manage', loadChildren: () => import('./management/management.module').then(m => m.ManagementModule) },
  { path: 'tutor', loadChildren: () => import('./tutor/tutor.module').then(m => m.TutorModule) },
  { path: 'std', loadChildren: () => import('./Student/student.module').then(m => m.StudentModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
