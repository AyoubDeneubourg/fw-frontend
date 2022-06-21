import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getHeaders } from '../authorization/authorization';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  readonly apiUrl = "https://fw-api-gateway.azurewebsites.net";


  constructor(private http: HttpClient, private router: Router) {

  }


  public getInfluencers(): Observable<any> {
   return this.http.get<any>(`${this.apiUrl}/api/influencer/`, getHeaders());
  }

  public getBrands(): Observable<any> {
   return this.http.get<any>(`${this.apiUrl}/api/brand/`, getHeaders());
  }
}
