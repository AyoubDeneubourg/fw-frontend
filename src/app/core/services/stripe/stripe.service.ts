import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
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
    name: 'Iphone',
    currency: 'usd',
    amount: 99900,
    quantity: '1',
    cancelUrl: environment.baseUrl + '/cancel',
    successUrl: environment.baseUrl + '/success',
  };



  
  public async pay() {
    
    const stripe = await this.stripePromise;

    this.http
    .post(`${this.apiUrl}/api/payment`, this.payment, getHeaders())
    .subscribe((data: any) => {
      // I use stripe to redirect To Checkout page of Stripe platform
      console.log(data);
      alert(data.id);
      stripe.redirectToCheckout({
        sessionId: data.id,
      });

    });

  }


}
