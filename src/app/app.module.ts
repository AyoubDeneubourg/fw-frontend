import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { InfluencerUpcomingEventsComponent } from './modules/dashboard/overview/influencers/upcoming-events/upcoming-events.component';
import { InfluencerRequestComponent } from './modules/dashboard/overview/influencers/request/request.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { OffersComponent } from './modules/offers/offers.component';
import { MainNavbarsComponent } from './shared/views/main-navbars/main-navbars.component';
import { SocialMediaDetailsComponent } from './modules/offers/social-media-details/social-media-details.component';
import { WizardComponent } from './modules/search/wizard/wizard.component';
import { StatisticsComponent } from './modules/statistics/statistics.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartComponent } from './modules/statistics/pie-chart/pie-chart.component';
import { BarVerticalComponent } from './modules/statistics/bar-vertical/bar-vertical.component';
import { LineChartComponent } from './modules/statistics/line-chart/line-chart.component';
import { SquaresComponent } from './shared/components/deco/squares/squares.component';
import { InfluencerBrandHistoryComponent } from './modules/dashboard/overview/influencers/history/history.component';
import { SocialMediaCounterPipe } from './shared/pipes/social-media-counter.pipe';
import { EarningsComponent } from './modules/statistics/earnings/earnings.component';
import { EditProfileComponent } from './modules/profile/edit/edit.component';
import { SuccessComponent } from './core/stripe/success/success.component';
import { CancelComponent } from './core/stripe/cancel/cancel.component';
import { CheckoutComponent } from './core/stripe/checkout/checkout.component';
import { SearchCardComponent } from './modules/search/search-card/search-card.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FirebaseApp, initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { ChatComponent } from './modules/chat/chat.component';
import { FirestoreModule, provideFirestore,getFirestore, Firestore } from '@angular/fire/firestore';
import {
  AngularFireDatabase,
  AngularFireDatabaseModule,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { SocialMediaPriceCounterPipe } from './shared/pipes/social-media-price-counter.pipe';
import { FirebaseTimeToNormalTimePipe } from './shared/pipes/firebase-time-to-normal-time.pipe';
import { FirebaseTimeToNormalDatePipe } from './shared/pipes/firebase-time-to-normal-date.pipe';
import { AveragePricePipe } from './shared/pipes/search/average-price.pipe';
import { BrandRequestedComponent } from './modules/dashboard/overview/brands/requested/requested.component';
import { BrandHistoryComponent } from './modules/dashboard/overview/brands/history/history.component';
import { BrandToPayComponent } from './modules/dashboard/overview/brands/to-pay/to-pay.component';
import { SlideCardComponent } from './modules/statistics/slide-card/slide-card.component';
import { InProgressComponent } from './modules/dashboard/overview/brands/in-progress/in-progress.component';
import { SmallComponent } from './shared/components/modal/small/small.component';
import { RegularComponent } from './shared/components/modal/regular/regular.component';
import { LargeComponent } from './shared/components/modal/large/large.component';

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
    InfluencerUpcomingEventsComponent,
    InfluencerRequestComponent,
    ProfileComponent,
    OffersComponent,
    MainNavbarsComponent,
    SocialMediaDetailsComponent,
    WizardComponent,
    StatisticsComponent,
    PieChartComponent,
    BarVerticalComponent,
    LineChartComponent,
    SquaresComponent,
    InfluencerBrandHistoryComponent,
    SocialMediaCounterPipe,
    EarningsComponent,
    EditProfileComponent,
    SuccessComponent,
    CancelComponent,
    CheckoutComponent,
    SearchCardComponent,
    ChatComponent,
    SocialMediaPriceCounterPipe,
    FirebaseTimeToNormalTimePipe,
    FirebaseTimeToNormalDatePipe,
    AveragePricePipe,
    BrandRequestedComponent,
    BrandHistoryComponent,
    BrandToPayComponent,
    SlideCardComponent,
    InProgressComponent,
    SmallComponent,
    RegularComponent,
    LargeComponent
  ],

  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslocoRootModule,
    NoopAnimationsModule,
    NgxChartsModule,
    NgxSliderModule,
    FirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),


  ],
  providers: [CookieService, FormBuilder],
  bootstrap: [AppComponent],
})
export class AppModule { }
