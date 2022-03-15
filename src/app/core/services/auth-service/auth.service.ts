import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Brand } from 'src/app/shared/models/brand';
import { LoginData, RegistrationData } from 'src/app/shared/models/common';
import { isNotNullOrUndefined } from 'src/app/shared/static/utils/is-null-or-undefined';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly apiUrl = "https://fw-auth-service.herokuapp.com";

  private subject = new BehaviorSubject<any>(null);
  isLoggedIn$: Observable<boolean>;


  constructor(private http: HttpClient) {




  }


  public get(params: string): Observable<RegistrationData> {
    return this.http.get<RegistrationData>(`${this.apiUrl}/get`);
  }

  public register(registrationData: RegistrationData | string): Observable<any> {
    return this.http.post<RegistrationData>(`${this.apiUrl}/post`, registrationData);
  }


  public login(loginData: LoginData): Observable<any> {

    return this.http.post<LoginData>(`${this.apiUrl}/login`, loginData, { observe: 'response' })
      .pipe(
        tap((response) => {

          if (response.headers.get('Authorization')) {
            this.setToken(response.headers.get('Authorization'));
          } else {
            throw new Error('No valid token returned');
          }

        })


      );
  }


  public logout(): void {
    this.removeToken();
  }



  public user(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/user`, this.getHeaders());
  }



  public isLoggedIn(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/user`, this.getHeaders());
  }



  private getToken(): Token {
    if (localStorage.getItem('token')) return localStorage.getItem('token') as Token;
    else return null
  }

  private setToken(token: Token) {
    localStorage.setItem('token', token);
  }

  private removeToken() {
    localStorage.removeItem('token')
  }

  private getHeaders(options?: any): any {
    let authorization = this.getToken() ? { 'Authorization': this.getToken() } : null

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...authorization,
        ...options
      })
    };
    return httpOptions;
  }

}

type Token = string;
