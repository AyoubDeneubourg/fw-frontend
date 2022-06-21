import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Statistics } from 'src/app/shared/models/common';
import { AuthService } from '../auth-service/auth.service';
import { getHeaders } from '../authorization/authorization';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  readonly apiUrl = "https://fw-api-gateway.azurewebsites.net";

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  
  public getTotalEarnings(id: number): Observable<Statistics> {
    return this.http.get<Statistics>(`${this.apiUrl}/api/partnership/stats/influencer/${id}`, getHeaders());
  }


}
