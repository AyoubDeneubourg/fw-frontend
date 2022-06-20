import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { of } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { IntrojsService } from 'src/app/core/services/introjs/introjs.service';
import { OffersService } from 'src/app/core/services/offers/offers.service';
import { StatsService } from 'src/app/core/services/stats/stats.service';
import { UserPreferencesService } from 'src/app/core/services/user-preferences/user-preferences.service';
import { CardData } from 'src/app/shared/components/card/card.component';
import { User } from 'src/app/shared/models/common';
import { Offer } from 'src/app/shared/models/offers';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user: User;
  public data1: CardData = {
    title: '',
    content: '',
  }

  public data2: CardData = {
    title: '0',
    content: 'Partnerships',
    position: 'top-right'
  }

  public data3: CardData = {
    title: '€0',
    content: 'Earned money this week',
    position: 'bottom-right'
  }

  public data4: CardData = {
    title: '',
    content: 'Partnership to do the next 7 days',
    position: 'bottom-right'
  }

  ngAfterViewInit(): void {

  setTimeout(() => {
    
    if(!this.userPreferencesService.currentPreferences.introduction) {
      this.introService.startIntroduction(this.user.userType);
      window.resizeTo(window.innerWidth, window.innerHeight);
    }
  }, 200);
    
}



  ngOnInit(): void {
    
    this.user = this.authService.loggedInUser;
    this.data1.title = this.user.firstName + ' ' + this.user.lastName;
    this.data1.content = this.user.city + ', ' + this.user.country;



    this.offersService.getUpcoming().pipe(
      take(1),
      tap((data: Offer[]) => {
        let count = 0;

        data.forEach(element => {
        
          let one_day=1000*60*60*24;
          let serverDateTime= new Date();
          let newDate = new Date(element.startDate);

          let diff = Math.ceil((newDate.getTime() - serverDateTime.getTime())/one_day);

          if(diff <= 7 && new Date(element.startDate) > new Date() || diff === -0) {
            count++;
          }

        });

        this.data4.title = count.toString();
      }),
      catchError(err => {
        return of(err)
      })).subscribe();


      if(this.user.userType == "INFLUENCER") {

        this.statsService.getTotalEarnings(this.user.id).pipe(
          take(1),
          tap(data => {
            this.data2.title = data.totalPartnerships.toString();
            this.data3.title = '€' + data.totalMoneyEarnedWeek.toString();
          })
          ).subscribe()
          
        }

      this.translocoService.selectTranslate('dashboard.partnerships').pipe(take(1),
        tap(value => {
          this.data2.content = value;
      })).subscribe();


      this.translocoService.selectTranslate('dashboard.earned').pipe(take(1),
        tap(value => {
          this.data3.content = value;
      })).subscribe();


      this.translocoService.selectTranslate('dashboard.toDo').pipe(take(1),
        tap(value => {
          this.data4.content = value;
      })).subscribe();
  }




  constructor(private authService: AuthService, 
    private statsService: StatsService, 
    private offersService: OffersService, 
    private translocoService: TranslocoService,
    private userPreferencesService: UserPreferencesService,
    private introService: IntrojsService) {



      
    }


}
