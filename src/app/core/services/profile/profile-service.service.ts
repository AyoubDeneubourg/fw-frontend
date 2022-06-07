import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/shared/models/common';
import { AuthService } from '../auth-service/auth.service';
import { getHeaders } from '../authorization/authorization';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  readonly apiUrl = "https://fw-api-gateway.herokuapp.com";

  constructor(private http: HttpClient, private authService: AuthService) {  

  }


  public getImage(userId: number): Observable<any> {

    return this.http.get(`${this.apiUrl}/api/image/${userId}`, {responseType: 'text', ...getHeaders()});


  }

  public postFile(formData, userId) {

    
    console.log(...formData);

    return this.http.put(`${this.apiUrl}/api/image/${userId}`, formData, getHeaders());
  }


  public updateInfluencerProfile(user: any, userId: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/profile/influencer/${userId}`, user, getHeaders());
  
    }


    public updateBrandProfile(user: Profile): Observable<any> {
      return this.http.put(`${this.apiUrl}/api/profile/brand/${user.id}`, user, getHeaders());
    
      }

}
