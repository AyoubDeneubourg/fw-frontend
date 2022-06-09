import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Brand } from 'src/app/shared/models/brand';
import { LoginData, RegistrationData, User } from 'src/app/shared/models/common';
import { Influencer } from 'src/app/shared/models/influencer';
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


  public register(registrationData: RegistrationData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/user`, registrationData);
  }



  public checkCredentialsAvailability(data): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/user/available`, data);
  }


  public cache: any = {
    'getUser': {},
  };

  public getUser(id: string): Observable<any> {
    if(this.cache?.getUser[id]) {

      console.log("no http call");
     return of(this.cache.getUser[id]);

    } else {
      console.log("http call");
      return this.http.get<User>(`${this.apiUrl}/api/user/${id}`, getHeaders()).pipe(
        tap((user) => {
          this.cache.getUser[id] = user;
        }
        )
      )
      
    }
  }

  public getProfile(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/profile/${id}`, getHeaders());
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



  public getInfluencer(userId: number): Observable<any> {
    console.log(userId)
    if (this.loggedInInfluencer) {

      console.log('no http call')
      return this.loggedInInfluencer$ as Observable<Influencer>;
    } else {

      // set influence ???
      return this.http.get<any>(`${this.apiUrl}/api/influencer/${userId}`, getHeaders());

    }
  }

  public getBrand(userId: number): Observable<any> {
    if (this.loggedInBrand) {

      console.log('no http call')
      return this.loggedInBrand$ as Observable<Brand>;
    } else {
            // set brand ???

    return this.http.get<any>(`${this.apiUrl}/api/brand/${userId}`, getHeaders());
  }
  }






  public colors: Color;

  public loggedInUser: User;
  public loggedInUser$: Observable<User> = of();

  public loggedInInfluencer: Influencer;
  public loggedInInfluencer$: Observable<Influencer> = of();
  
  public loggedInBrand: Brand;
  public loggedInBrand$: Observable<Brand> = of();


  public getCurrentLoggedInUser(): Observable<User> {

    if (this.loggedInUser && this.loggedInBrand || this.loggedInInfluencer) {

      console.log('no http call')
      return this.loggedInUser$ as Observable<User>;
    } else {
      
      console.log('http call')
      return this.http
        .get<User>(`${this.apiUrl}/api/user/current `, getHeaders())
        .pipe(
          switchMap((loggedInUser) =>  {
            this.loggedInUser = loggedInUser;
            this.loggedInUser$ = of(loggedInUser);
            
            if(this.loggedInUser.userType == "BRAND") {
              this.colors = "orange"
              return this.getBrand(this.loggedInUser.id);

            } 
            if(this.loggedInUser.userType == "INFLUENCER") {
              this.colors = "blue"

              return this.getInfluencer(loggedInUser.id);
            }
            }),
   
          tap((loggedInUserOrInfluencer) => {


            if(this.loggedInUser.userType == "BRAND") {

              this.loggedInBrand = loggedInUserOrInfluencer;
              this.loggedInBrand$ = of(loggedInUserOrInfluencer);
            } 
            if(this.loggedInUser.userType == "INFLUENCER") {
                
                this.loggedInInfluencer = loggedInUserOrInfluencer;
                this.loggedInInfluencer$ = of(loggedInUserOrInfluencer);
            } 



  

          }),
        );

    }

  }


  public logout(): void {
    removeToken();
    this.router.navigateByUrl('/').then(() => {
      window.location.reload();
    });
    
    //window.location.href = window.location.protocol + '//' + window.location.host + '/path/to';
    //location.href = '/admin/dashboard';

  }


}

export type Color = "blue" | "orange";