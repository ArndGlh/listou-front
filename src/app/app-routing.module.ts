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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [LoginGuard] },
  { path: 'user', component: BoardUserComponent, canActivate: [LoginGuard] },
  { path: 'mod', component: BoardModeratorComponent, canActivate: [LoginGuard] },
  { path: 'admin', component: BoardAdminComponent, canActivate: [LoginGuard] },
  { path: 'listou', component: ListouComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
