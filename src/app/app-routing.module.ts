import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { HomeComponent } from './components/home/home.component';
// import { LoginComponent } from './components/login/login.component';
// import { SignupComponent } from './components/signup/signup.component';
// import { RoomsPageComponent } from './components/rooms-page/rooms-page.component';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { HomeComponent } from './feature/pages/home/home.component';
import { AboutComponent } from './feature/pages/about/about.component';
import { ContactComponent } from './feature/pages/contact/contact.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PageNotFoundComponent } from './feature/pages/page-not-found/page-not-found.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'rooms',
    loadChildren: () => import('./feature/rooms/rooms.module').then(m => m.RoomsModule)
  },
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./feature/dashboard/dashboard.module').then(m => m.DashboardModule)
  // },
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   ...canActivate(redirectToLogin),
  // },
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
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
