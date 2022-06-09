import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { of } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { AuthService, Color } from 'src/app/core/services/auth-service/auth.service';
import { OffersService } from 'src/app/core/services/offers/offers.service';
import { StripeService } from 'src/app/core/services/stripe/stripe.service';
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
    title: '0€',
    content: 'Earned money this week',
    position: 'bottom-right'
  }

  public data4: CardData = {
    title: '',
    content: 'Partnership to do the next 7 days',
    position: 'bottom-right'
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
  }




  constructor(private authService: AuthService, private offersService: OffersService) {}


}
