import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/shared/models/offers';
import { AuthService } from '../auth-service/auth.service';
import { getHeaders } from '../authorization/authorization';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  readonly apiUrl = "https://fw-api-gateway.azurewebsites.net";



  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }


  public createOffer(offer: Offer | any): Observable<Offer> {
    return this.http.post<Offer | any>(`${this.apiUrl}/api/partnership`, offer, getHeaders());
  }


  public postFile(formData, partnershipId) {
    return this.http.post(`${this.apiUrl}/api/file/${partnershipId}`, formData, getHeaders());
  }


  public acceptPartnership(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/partnership/accept/${id}`, getHeaders());
  }


  
  public declinePartnership(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/partnership/decline/${id}`, getHeaders());
  }


  public finishPartnership(partnershipId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/partnership/finish/${partnershipId}`, getHeaders());
  }


  public getAllInfluencerPartnerships(): Observable<Offer[]> {    
    const userID = this.authService.loggedInUser.id;
    return this.http.get<Offer[]>(`${this.apiUrl}/api/partnership/influencer/${userID}`, getHeaders());
  }

  public getAllBrandPartnerships(): Observable<Offer[]> {    
    const userID = this.authService.loggedInUser.id;
    return this.http.get<Offer[]>(`${this.apiUrl}/api/partnership/brand/${userID}`, getHeaders());
  }

  public getHistory(): Observable<Offer[]> {
    const userID = this.authService.loggedInUser.id;
    return this.http.get<Offer[]>(`${this.apiUrl}/api/partnership/history/${userID}`, getHeaders());
  }



  public getRequested(): Observable<Offer[]> {
    const userID = this.authService.loggedInUser.id;
    return this.http.get<Offer[]>(`${this.apiUrl}/api/partnership/requested/${userID}`, getHeaders());
  }

  
  public getUpcoming(): Observable<Offer[]> {    
    const userID = this.authService.loggedInUser.id;
    return this.http.get<Offer[]>(`${this.apiUrl}/api/partnership/upcoming/${userID}`, getHeaders());
  }


}