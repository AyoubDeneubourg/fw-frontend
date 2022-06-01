import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { StripeService } from 'src/app/core/services/stripe/stripe.service';
import { CardData } from 'src/app/shared/components/card/card.component';


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
    title: '2',
    content: 'Partnership to do the next 7 days',
    position: 'bottom-right'
  }


  ngOnInit(): void {
  }




  constructor(private stripeService: StripeService) {}

  async pay(): Promise<void> {
    // todo, add partnershipId
    this.stripeService.pay(0);
   

}
}
