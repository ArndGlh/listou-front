import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ProfileDetailsComponent } from './components/user/profile/profile-details/profile-details.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ProfileMainComponent } from './components/user/profile/profile-main/profile-main.component';
import { ProfileAccountComponent } from './components/user/profile/profile-account/profile-account.component';
import { ProfileNotificationsComponent } from './components/user/profile/profile-notifications/profile-notifications.component';
import { ProfilePreferencesComponent } from './components/user/profile/profile-preferences/profile-preferences.component';

import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule} from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { DialogDetailsComponent } from './components/boards/board-admin/dialog-details/dialog-details.component';
import { MessageService } from 'primeng/api';
import { DialogCreateEventComponent } from './components/applications/listou/dialog-create-event/dialog-create-event.component';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentUtcDateAdapter } from './_services/momentUtcDateAdapter.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { EventDetailsComponent } from './components/applications/listou/event-details/event-details.component';
import { MatIconRegistry } from '@angular/material/icon';
import { AngularSvgIconModule } from 'angular-svg-icon';

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
    ContactComponent,
    ProfileDetailsComponent,
    ProfileMainComponent,
    ProfileAccountComponent,
    ProfileNotificationsComponent,
    ProfilePreferencesComponent,
    DialogDetailsComponent,
    DialogCreateEventComponent,
    EventDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialFileInputModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
			timeOut: 7000,
			positionClass: 'toast-bottom-left',
			maxOpened: 3,
			preventDuplicates: true
    }),
    BrowserAnimationsModule,
    SharedModule,
    FlexLayoutModule,
    RxReactiveFormsModule,
    TableModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    ToastModule,
    CalendarModule,
    DropdownModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCCUZWDcuQHBGlY_fYWsirZuZ0HtkBQRTI',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatInputModule,
    AngularSvgIconModule.forRoot()
  ],
  providers: [
    authInterceptorProviders,
    ConfirmationService,
    MessageService,
    { provide: MAT_DATE_LOCALE, useValue: 'fr' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogDetailsComponent,
    DialogCreateEventComponent
  ],
})
export class AppModule { }



