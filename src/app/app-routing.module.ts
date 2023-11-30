import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { BoardUserComponent } from './components/boards/board-user/board-user.component';
import { BoardModeratorComponent } from './components/boards/board-moderator/board-moderator.component';
import { BoardAdminComponent } from './components/boards/board-admin/board-admin.component';
import { LoginGuard } from './_helpers/login-guard';
import { ListouComponent } from './components/applications/listou/listou.component';
import { SuggestionsComponent } from './components/application-services/suggestions/suggestions.component';
import { BugReportComponent } from './components/application-services/bug-report/bug-report.component';
import { ContactComponent } from './components/application-services/contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [LoginGuard] },
  {
    path: 'board-user',
    component: BoardUserComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'mod',
    component: BoardModeratorComponent,
    canActivate: [LoginGuard],
  },
  { path: 'admin', component: BoardAdminComponent, canActivate: [LoginGuard] },
  {
    path: 'create-event',
    component: ListouComponent,
    canActivate: [LoginGuard],
  },
  { path: 'suggestions', component: SuggestionsComponent },
  { path: 'bug-report', component: BugReportComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
