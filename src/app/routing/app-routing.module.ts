import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancelComponent } from '../core/stripe/cancel/cancel.component';
import { SuccessComponent } from '../core/stripe/success/success.component';
import { LoginComponent } from '../modules/auth/login/login.component';
import { RegisterComponent } from '../modules/auth/register/register.component';
import { ChatComponent } from '../modules/chat/chat.component';
import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { HomeComponent } from '../modules/home/home.component';
import { OffersComponent } from '../modules/offers/offers.component';
import { EditProfileComponent } from '../modules/profile/edit/edit.component';
import { ProfileComponent } from '../modules/profile/profile.component';
import { SetupProfileComponent } from '../modules/profile/setup/setup.component';
import { WizardComponent } from '../modules/search/wizard/wizard.component';
import { StatisticsComponent } from '../modules/statistics/statistics.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { SearchComponent } from '../modules/search/search.component';

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
    path: 'profile/setup', // profile
    component: SetupProfileComponent,
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
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'chat/:id',
    component: ChatComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'wizard',
    component: WizardComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'payment/success',
    component: SuccessComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'payment/canceled',
    component: CancelComponent,
    canActivate: [AuthenticatedGuard],
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