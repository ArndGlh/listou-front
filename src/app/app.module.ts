import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { BoardAdminComponent } from './components/boards/board-admin/board-admin.component';
import { BoardModeratorComponent } from './components/boards/board-moderator/board-moderator.component';
import { BoardUserComponent } from './components/boards/board-user/board-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { SharedModule } from './shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListouComponent } from './components/applications/listou/listou.component';
import { SuggestionsComponent } from './components/application-services/suggestions/suggestions.component';
import { BugReportComponent } from './components/application-services/bug-report/bug-report.component';
import { ContactComponent } from './components/application-services/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    ListouComponent,
    SuggestionsComponent,
    BugReportComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
			timeOut: 7000,
			positionClass: 'toast-bottom-left',
			maxOpened: 3,
			preventDuplicates: true
    }),
    BrowserAnimationsModule,
    SharedModule,
    FlexLayoutModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }



