import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RoomsPageComponent } from './components/rooms-page/rooms-page.component';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  {
    path: 'rooms',
    component: RoomsPageComponent,
    ...canActivate(redirectToLogin),
  },
  { 
    path: 'dashboard',
    component: DashboardComponent,
    ...canActivate(redirectToLogin),
  },
  { 
    path: 'login', 
    component: LoginComponent, 
    ...canActivate(redirectToHome) 
  },
  { 
    path: 'sign-up', 
    component: SignupComponent,
    ...canActivate(redirectToHome)
  },
  { 
    path: '**', 
    component: HomeComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
