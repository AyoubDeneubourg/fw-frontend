import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginData, RegistrationData, User } from 'src/app/shared/models/common';
import { getHeaders, getToken, removeToken, setToken } from '../authorization/authorization';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly apiUrl = "https://fw-api-gateway.herokuapp.com";


  constructor(private http: HttpClient, private router: Router) {

   /* 
        const hours: number = 2;

        setInterval(() => {
          this.loggedInUser = undefined;
        }, 1000 * 60 * hours); 
        */

  }


  public register(registrationData?: RegistrationData | string): Observable<any> {
    return this.http.post<RegistrationData>(`${this.apiUrl}/api/user`, registrationData);
  }



  public checkIfEmailAvailable(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/api/user/email/${email}`, null);
  }


  public getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/api/user/${id}`, getHeaders());
  }

  

  public login(loginData: LoginData): Observable<any> {

    return this.http.post<LoginData>(`${this.apiUrl}/api/login`, loginData, { observe: 'response' })
      .pipe(
        tap((response) => {
          
          console.log(response.headers.get('Authorization'));
          console.log(response);
          if (response.headers.get('Authorization')) {
            setToken(response.headers.get('Authorization'));
          } else {
            throw new Error('No valid token available');
          }
        })
      );
  }






  public loggedInUser: User;
  public loggedInUser$: Observable<User> = of();


  public getCurrentLoggedInUser(): Observable<User> {

    if (this.loggedInUser) {

      console.log('no http call')
      return this.loggedInUser$ as Observable<User>;
    } else {
      
      console.log('http call')
      return this.http
        .get<User>(`${this.apiUrl}/api/user/current `, getHeaders())
        .pipe(
          tap((loggedInUser) => {
            this.loggedInUser = loggedInUser;
            this.loggedInUser$ = of(loggedInUser);

          })
        );

    }

  }


  public logout(): void {
    removeToken();
    this.router.navigateByUrl('/')
  }


}
