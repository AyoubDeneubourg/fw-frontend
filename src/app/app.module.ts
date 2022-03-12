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
import { SideNavigationComponent } from './shared/components/side-navigation/side-navigation.component';
import { InputValidationErrorComponent } from './shared/components/input-validation-error/input-validation-error.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './modules/auth/register/register.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { HeaderComponent } from './modules/home/header/header.component';
import { BottomNavigationComponent } from './shared/components/bottom-navigation/bottom-navigation.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ChangeLanguageComponent,
    SideNavigationComponent,
    InputValidationErrorComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    BottomNavigationComponent
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
