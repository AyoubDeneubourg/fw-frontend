import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { of } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { AuthService, Color } from 'src/app/core/services/auth-service/auth.service';
import { OffersService } from 'src/app/core/services/offers/offers.service';
import { StripeService } from 'src/app/core/services/stripe/stripe.service';
import { CardData } from 'src/app/shared/components/card/card.component';
import { Offer } from 'src/app/shared/models/offers';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public data1: CardData = {
    title: 'Alexander Doe',
    content: 'Brussels,',
  }

  public data2: CardData = {
    title: '5',
    content: 'Partnerships',
    position: 'top-right'
  }

  public data3: CardData = {
    title: '8235€',
    content: 'Earned money this week',
    position: 'bottom-right'
  }

  public data4: CardData = {
    title: '',
    content: 'Partnership to do the next 7 days',
    position: 'bottom-right'
  }



  ngOnInit(): void {
    
    this.offersService.getUpcoming().pipe(
      take(1),
      tap((data: Offer[]) => {
        let count = 0;

        data.forEach(element => {
          console.log(element.startDate);
        
          let one_day=1000*60*60*24;
          let serverDateTime= new Date();
          let newDate = new Date(element.startDate);

          let diff = Math.ceil((newDate.getTime() - serverDateTime.getTime())/one_day);

          console.log(diff);
          if(diff <= 7 && new Date(element.startDate) > new Date() || diff === -0) {
            console.log(element.startDate)
            count++;
          }

        });

        this.data4.title = count.toString();
      }),
      catchError(err => {
        return of(err)
      })).subscribe();
  }




  constructor(private stripeService: StripeService, private offersService: OffersService) {}

  async pay(): Promise<void> {
    // todo, add partnershipId
    this.stripeService.pay(0);
   

}
}
