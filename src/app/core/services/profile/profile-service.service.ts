import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

    
   // let headers = new Headers();
    /** In Angular 5, including the header Content-Type can invalidate your request */
//    headers.append('Content-Type', 'multipart/form-data');
 //   headers.append('Accept', 'application/json')

    let x = {
      'Content-Type' : null

    }
    console.log(...formData);

    return this.http.post(`${this.apiUrl}/api/image/${userId}`, formData, getHeaders());
  }
}
