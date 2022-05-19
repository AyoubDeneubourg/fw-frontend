import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/shared/models/offers';
import { getHeaders } from '../authorization/authorization';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  readonly apiUrl = "https://fw-api-gateway.herokuapp.com";



  constructor(private http: HttpClient, private router: Router) { }


  public createOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(`${this.apiUrl}/api/offer`, offer, getHeaders());
  }






}