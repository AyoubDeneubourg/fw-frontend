import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Brand } from 'src/app/shared/models/brand';
import { LoginData, RegistrationData, User } from 'src/app/shared/models/common';
import { Influencer } from 'src/app/shared/models/influencer';
import { getHeaders, removeToken, setToken } from '../authorization/authorization';


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
    'getInfluencer': {},
    'getBrand': {},
  };

  public getUser(id: string): Observable<any> {
    if(this.cache?.getUser[id]) {

     return of(this.cache.getUser[id]);

    } else {
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
          
          if (response.headers.get('Authorization')) {
            setToken(response.headers.get('Authorization'));
          } else {
            throw new Error('No valid token available');
          }
        })
      );
  }



  public getInfluencer(userId: number): Observable<any> {

    if(this.cache?.getInfluencer[userId]) {

    return of(this.cache.getInfluencer[userId]);

    } else {

      return this.http.get<any>(`${this.apiUrl}/api/influencer/${userId}`, getHeaders()).pipe(
        tap((user) => {
          this.cache.getInfluencer[userId] = user;
        }

      ));

    }
  }

  public getBrand(userId: number): Observable<any> {
    if (this.cache?.getBrand[userId]) {

      return of(this.cache.getBrand[userId]);
    } else {
           
    return this.http.get<any>(`${this.apiUrl}/api/brand/${userId}`, getHeaders()).pipe(
      tap((user) => {
        this.cache.getBrand[userId] = user;
      }

    ));
  }
  }


  public colors: Color;

  public loggedInUser: User;
  public loggedInUser$: Observable<User> = of();
  public profilePicture = new Subject<boolean>();

  public loggedInInfluencer: Influencer;
  public loggedInInfluencer$: Observable<Influencer> = of();
  
  public loggedInBrand: Brand;
  public loggedInBrand$: Observable<Brand> = of();


  public getCurrentLoggedInUser(): Observable<User> {

    if (this.loggedInUser && this.loggedInBrand || this.loggedInInfluencer) {

      return this.loggedInUser$ as Observable<User>;
    } else {
      
      return this.http
        .get<User>(`${this.apiUrl}/api/user/current `, getHeaders())
        .pipe(
          switchMap((loggedInUser) =>  {
            this.loggedInUser = loggedInUser;
            this.loggedInUser$ = of(loggedInUser);

            this.http.get(`${this.apiUrl}/api/image/${this.loggedInUser.id}`, {responseType: 'text', ...getHeaders()})
            .subscribe(
              res => {
                this.loggedInUser.profilePicture = true;
                this.loggedInUser$ = of(this.loggedInUser);
              },
              err => {
                console.log('No profile picture');
              }
            );

            

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


  public getImage(userId: number): Observable<any> {

    return this.http.get(`${this.apiUrl}/api/image/${userId}`, {responseType: 'text', ...getHeaders()});

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