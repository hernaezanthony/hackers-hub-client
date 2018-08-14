import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EventsComponent } from './events/events.component';
import { FormsComponent } from './forms/forms.component';

import { ReactiveFormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MaterialModule } from 'src/app/material.module';
import { EditFormsComponent } from './edit-forms/edit-forms.component';

import { ConfirmDialogModule, ConfirmationService, SharedModule } from 'primeng/primeng';
import {CalendarModule} from 'primeng/calendar';
import {FormsModule} from '@angular/forms';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import {ToolbarModule} from 'primeng/toolbar';

import { AlertComponent } from './alert/alert.component';

import { AuthGuard } from 'src/app/auth.guard';
import { JwtInterceptor } from 'src/app/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/error.interceptor';
import { AlertService } from 'src/app/alert.service';
import { AuthenticationService } from 'src/app/authentication.service';
import { UserService } from 'src/app/user.service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    EventsComponent,
    FormsComponent,
    EditFormsComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ConfirmDialogModule,
    SharedModule,
    FormsModule,
    CalendarModule,
    NgxMaterialTimepickerModule.forRoot(),
    ToolbarModule,
    OverlayPanelModule

  ],
  providers: [AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
