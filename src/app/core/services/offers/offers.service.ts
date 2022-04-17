import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/shared/models/offers';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  readonly apiUrl = "https://httpbin.org";



  constructor(private http: HttpClient, private router: Router) { }


  public register(registrationData: Offer): Observable<Offer> {
    return this.http.post<Offer>(`${this.apiUrl}/offer`, registrationData);
  }



  public createOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(`${this.apiUrl}/offer`, offer);
  }






}