import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/shared/models/common';
import { AuthService } from '../auth-service/auth.service';
import { getHeaders } from '../authorization/authorization';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  readonly apiUrl = "https://fw-api-gateway.herokuapp.com";

  constructor(private http: HttpClient, private authService: AuthService) {  

  }


  public postRating(data: Rate) {
    return this.http.post<Rate>(`${this.apiUrl}/api/rating`, data, getHeaders());
  }


  public getInfluencerRating(id): Observable<Rate> {
    return this.http.get<Rate>(`${this.apiUrl}/api/rating/influencer/${id}`,  getHeaders());
  
    }

  public getBrandRating(id): Observable<Rate> {
    return this.http.get<Rate>(`${this.apiUrl}/api/rating/brand/${id}`,  getHeaders());
  
    }

  public getAverageInfluencerRating(id): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/api/rating/influencer/${id}/average`,  getHeaders());
  
    }


}


export type Rate = {
    id?: number,
    influencerId: number,
    brandId: number,
    amount: 1 | 2 | 3 | 4 | 5,
    description: string
}