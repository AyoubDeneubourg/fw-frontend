import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../modules/auth/login/login.component';
import { RegisterComponent } from '../modules/auth/register/register.component';
import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { HomeComponent } from '../modules/home/home.component';
import { ProfileComponent } from '../modules/profile/profile.component';
import { SearchComponent } from '../modules/search/search.component';
import { ChangeLanguageComponent } from '../shared/components/change-language/change-language.component';
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
    canActivate: [],
  },
  {
    path: 'profile', // profile
    component: ProfileComponent,
    canActivate: [],
  },
  {
    path: 'profiles/:id', // profile
    component: ProfileComponent,
    canActivate: [AuthenticatedGuard],
  },

  {
    path: 'search',
    component: SearchComponent,
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
