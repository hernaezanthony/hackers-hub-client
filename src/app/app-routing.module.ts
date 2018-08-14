import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { FormsComponent } from './forms/forms.component';
import { EditFormsComponent } from './edit-forms/edit-forms.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from 'src/app/auth.guard';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';




const routes: Routes = [

  {
    path: '',
    component: EventsComponent , canActivate: [AuthGuard]
  },
  {
    path: 'forms',
      component: FormsComponent,  canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
      component: EditFormsComponent ,  canActivate: [AuthGuard]
  },
  {
    path: 'login',
      component: LoginComponent
  },
  {
    path: 'register',
      component: RegisterComponent
  },
  {
    path: 'profile',
      component: ProfileComponent, canActivate: [AuthGuard]
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
