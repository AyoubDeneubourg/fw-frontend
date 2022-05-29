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



  public getInfluencer(userId: number): Observable<any> {
    console.log(userId)
    return this.http.get<any>(`${this.apiUrl}/api/influencer/uuid/${userId}`, getHeaders());
  }

  public getBrand(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/brand/uuid/${userId}`, getHeaders());
  }







  public loggedInUser: User;
  public loggedInUser$: Observable<User> = of();

  public loggedInInfluencer: Influencer;
  public loggedInInfluencer$: Observable<Influencer> = of();
  
  public loggedInBrand: Brand;
  public loggedInBrand$: Observable<Brand> = of();


  public getCurrentLoggedInUser(): Observable<User> {

    if (this.loggedInUser) {

      console.log('no http call')
      return this.loggedInUser$ as Observable<User>;
    } else {
      
      console.log('http call')
      return this.http
        .get<User>(`${this.apiUrl}/api/user/current `, getHeaders())
        .pipe(
          switchMap((loggedInUser) =>  {
            console.log(loggedInUser.id);
            this.loggedInUser = loggedInUser;
            this.loggedInUser$ = of(loggedInUser);
            
            console.log(loggedInUser.userType);
            if(this.loggedInUser.userType == "BRAND") return this.getBrand(this.loggedInUser.id);
            if(this.loggedInUser.userType == "INFLUENCER") return this.getInfluencer(loggedInUser.id);

            }),
   
          tap((loggedInUserOrInfluencer) => {

            console.log(loggedInUserOrInfluencer)

            if(this.loggedInUser.userType == "BRAND") {

              this.loggedInBrand = loggedInUserOrInfluencer;
              this.loggedInBrand$ = of(loggedInUserOrInfluencer);
            } 
            if(this.loggedInUser.userType == "INFLUENCER") {
                
                this.loggedInInfluencer = loggedInUserOrInfluencer;
                this.loggedInInfluencer$ = of(loggedInUserOrInfluencer);
            } 


            console.log(loggedInUserOrInfluencer);

  

          }),
        );

    }

  }


  public logout(): void {
    removeToken();
    this.router.navigateByUrl('/')
  }


}
