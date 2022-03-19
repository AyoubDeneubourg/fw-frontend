import { NgModule } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { Observable } from 'rxjs';
import { TranslocoRootModule } from './shared/translations/transloco-root.module';
import { ChangeLanguageComponent } from './shared/components/change-language/change-language.component';
import { PagesSideNavigationComponent } from './shared/components/pages-side-navigation/pages-side-navigation.component';
import { InputValidationErrorComponent } from './shared/components/input-validation-error/input-validation-error.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './modules/auth/register/register.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { HeaderComponent } from './modules/home/header/header.component';
import { PagesBottomNavigationComponent } from './shared/components/pages-bottom-navigation/pages-bottom-navigation.component';
import { LeftNavigationComponent } from './shared/components/left-navigation/left-navigation.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { CardComponent } from './shared/components/card/card.component';
import { TopNavigationComponent } from './shared/components/top-navigation/top-navigation.component';
import { SearchComponent } from './modules/search/search.component';
import { OverviewComponent } from './modules/dashboard/overview/overview.component';
import { UpcomingEventsComponent } from './modules/dashboard/overview/upcoming-events/upcoming-events.component';
import { RequestComponent } from './modules/dashboard/overview/request/request.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { OffersComponent } from './modules/offers/offers.component';
import { MainNavbarsComponent } from './shared/views/main-navbars/main-navbars.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ChangeLanguageComponent,
    PagesSideNavigationComponent,
    InputValidationErrorComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    PagesBottomNavigationComponent,
    LeftNavigationComponent,
    DashboardComponent,
    CardComponent,
    TopNavigationComponent,
    SearchComponent,
    OverviewComponent,
    UpcomingEventsComponent,
    RequestComponent,
    ProfileComponent,
    OffersComponent,
    MainNavbarsComponent
  ],

  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TranslocoRootModule,
    NoopAnimationsModule

  ],
  providers: [CookieService, FormBuilder],
  bootstrap: [AppComponent],
})
export class AppModule { }
