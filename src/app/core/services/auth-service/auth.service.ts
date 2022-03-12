import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Brand } from 'src/app/shared/models/brand';
import { LoginData, RegistrationData } from 'src/app/shared/models/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly apiUrl = "https://httpbin.org";

  constructor(private http: HttpClient) { }


  public get(params: string): Observable<RegistrationData> {
    return this.http.get<RegistrationData>(`${this.apiUrl}/get`);
  }

  public register(data: RegistrationData | string): Observable<any> {
    return this.http.post<RegistrationData>(`${this.apiUrl}/post`, data);
  }


  public login(data: LoginData | string): Observable<any> {
    return this.http.post<LoginData>(`${this.apiUrl}/post`, data);
  }

}
