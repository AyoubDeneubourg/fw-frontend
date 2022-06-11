import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { getHeaders } from '../authorization/authorization';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  readonly apiUrl = "https://fw-api-gateway.herokuapp.com";

  stripePromise = loadStripe(environment.stripe);


  constructor(private http: HttpClient) { }


   // here we create a payment object
   public payment = {
    partnershipId: null,
    name: 'Partnership',
    currency: 'eur',
    amount: null,
    quantity: 1,
    cancelUrl: environment.baseUrl + '/payment/canceled',
    successUrl: environment.baseUrl + '/payment/success',
  };



  
  public async pay(item) {
    
    let val = 0;
    item.socialMediaDetails.forEach(element => {
      
      val += (element.storyPrice * element.stories);
      val += (element.postPrice * element.posts);
      val += (element.highlightPrice * element.highlights);
    });

    this.payment.partnershipId = item.id;
    this.payment.amount = val * 100;

  
    const stripe = await this.stripePromise;

    this.http
    .post(`${this.apiUrl}/api/payment`, this.payment, getHeaders())
    .subscribe((data: any) => {

      stripe.redirectToCheckout({
        sessionId: data.id,
      });

    }), catchError(err => {
      console.log(err);
      return of(err)
    })}


  


}
