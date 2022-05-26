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
    partnershipId: 185,
    name: 'Iphone',
    currency: 'usd',
    amount: 99900,
    quantity: 1,
    cancelUrl: environment.baseUrl + '/cancel',
    successUrl: environment.baseUrl + '/success',
  };



  
  public async pay(partnershipId: number | string) {
    
    console.log(this.payment);
    const stripe = await this.stripePromise;

    this.http
    .post(`${this.apiUrl}/api/payment`, this.payment, getHeaders())
    .subscribe((data: any) => {

      alert(data.id);
      stripe.redirectToCheckout({
        sessionId: data.id,
      });

    }), catchError(err => {
      console.log(err);
      return of(err)
    })}


  


}
