import { NgModule } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { Observable } from 'rxjs';
// import { RegisterComponent } from './pages/common/register/register.component';
import { TranslocoRootModule } from './shared/translations/transloco-root.module';
import { ChangeLanguageComponent } from './shared/components/change-language/change-language.component';


@NgModule({
  declarations: [
    AppComponent,
    // RegisterComponent, 
    ChangeLanguageComponent
  ],

  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TranslocoRootModule
  ],
  providers: [CookieService, FormBuilder],
  bootstrap: [AppComponent],
})
export class AppModule { }
