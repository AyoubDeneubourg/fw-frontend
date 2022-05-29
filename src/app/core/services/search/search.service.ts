import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from 'express';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  readonly apiUrl = "https://fw-api-gateway.herokuapp.com";


  constructor(private http: HttpClient, private router: Router) {

  }


  public getInfluencers() {
    
  }
}
