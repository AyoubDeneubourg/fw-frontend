import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginData, RegistrationData, User } from 'src/app/shared/models/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly apiUrl = "https://fw-auth-service.herokuapp.com";


  constructor(private http: HttpClient, private router: Router) {

    const hours: number = 2;

    /*     setInterval(() => {
          this.loggedInUser = undefined;
        }, 1000 * 60 * hours); */



  }


  public get(params: string): Observable<RegistrationData> {
    return this.http.get<RegistrationData>(`${this.apiUrl}/get`);
  }

  public register(registrationData: RegistrationData | string): Observable<any> {
    return this.http.post<RegistrationData>(`${this.apiUrl}/post`, registrationData);
  }



  public checkIfEmailAvailable(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/api/user/email/${email}`, null);
  }



  public login(loginData: LoginData): Observable<any> {

    return this.http.post<LoginData>(`${this.apiUrl}/login`, loginData, { observe: 'response' })
      .pipe(
        tap((response) => {
          if (response.headers.get('Authorization')) {
            this.setToken(response.headers.get('Authorization'));
          } else {
            throw new Error('No valid token available');
          }
        })
      );
  }


  public logout(): void {
    this.removeToken();
    this.router.navigateByUrl('/')
  }



  public isLoggedIn(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/user/current`, this.getHeaders());
  }





  private getToken(): Token {
    if (localStorage.getItem('token')) return localStorage.getItem('token') as Token;
    else return null
  }

  private setToken(token: Token) {
    localStorage.setItem('token', token);
  }

  private removeToken() {
    localStorage.removeItem('token');
  }



  private getHeaders(options?: any): HttpOptions {
    const authorization = this.getToken() ? { 'Authorization': this.getToken() } : null

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...authorization,
        ...options
      })
    };
    return httpOptions;
  }






  public loggedInUser: User;
  public loggedInUser$: Observable<User> = of();


  public getCurrentLoggedInUser(): Observable<User> {

    if (this.loggedInUser) {

      return this.loggedInUser$ as Observable<User>;

    } else {
      console.log('http call')
      return this.http
        .get<User>(`${this.apiUrl}/api/user/current`, this.getHeaders())
        .pipe(
          tap((loggedInUser) => {
            this.loggedInUser = loggedInUser;
            this.loggedInUser$ = of(loggedInUser);

          })
        );

    }

  }


}

export type Token = string;

export type HttpOptions = {
  headers: HttpHeaders
}