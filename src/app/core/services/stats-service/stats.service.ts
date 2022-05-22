import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginData, RegistrationData, User } from 'src/app/shared/models/common';
import { AuthService } from '../auth-service/auth.service';
import { getHeaders, getToken, removeToken, setToken } from '../authorization/authorization';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  readonly apiUrl = "https://fw-api-gateway.herokuapp.com";

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  
  public getTotalEarnings(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/partnership/stats/influencer/${id}`, getHeaders());
  }


}
