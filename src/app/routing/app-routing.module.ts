import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../modules/auth/login/login.component';
import { RegisterComponent } from '../modules/auth/register/register.component';
import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { HomeComponent } from '../modules/home/home.component';
import { OffersComponent } from '../modules/offers/offers.component';
import { EditProfileComponent } from '../modules/profile/edit/edit.component';
import { ProfileComponent } from '../modules/profile/profile.component';
import { SearchComponent } from '../modules/search/search.component';
import { WizardComponent } from '../modules/search/wizard/wizard.component';
import { StatisticsComponent } from '../modules/statistics/statistics.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [], // is not auth
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'profile', // profile
    component: ProfileComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'profile/edit', // profile
    component: EditProfileComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'profile/:id', // profile
    component: ProfileComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'offer/new/:id', // profile
    component: OffersComponent,
    canActivate: [AuthenticatedGuard],
  },

  {
    path: 'search',
    component: SearchComponent,
    canActivate: [],
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'wizard',
    component: WizardComponent,
    canActivate: [],
  },
  {
    path: '**', redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }