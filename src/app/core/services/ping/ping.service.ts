import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { catchError, take, tap } from 'rxjs/operators';
import { Profile } from 'src/app/shared/models/common';
import { AuthService } from '../auth-service/auth.service';
import { getHeaders } from '../authorization/authorization';

@Injectable({
  providedIn: 'root'
})
export class PingService {

  readonly apiUrl = "https://fw-api-gateway.herokuapp.com";

  constructor(private http: HttpClient) {  

  }


  public userService(): void {
    this.http.get(`https://fw-api-gateway.herokuapp.com/api/user/ping`, getHeaders()).pipe(
      take(1),
      catchError(err => {
        console.clear();
        return of(err);
      }))
      .subscribe();
    }

  public fileService(): void {
    this.http.get(`https://fw-api-gateway.herokuapp.com/api/file/ping`, getHeaders()).pipe(
      take(1),
      catchError(err => {
        console.clear();
        return of(err);
      }))
      .subscribe();
    }

  public partnershipService(): void {
    this.http.get(`https://fw-api-gateway.herokuapp.com/api/partnership/ping`, getHeaders()).pipe(
      take(1),
      catchError(err => {
        console.clear();
        return of(err);
      }))
      .subscribe();
    }

  public paymentService(): void {
    this.http.get(`https://fw-api-gateway.herokuapp.com/api/payment/ping`, getHeaders()).pipe(
      take(1),
      catchError(err => {
        console.clear();
        return of(err);
      }))
      .subscribe();
    }


    

  public profileService(): void {
    this.http.get(`https://fw-profile-service.herokuapp.com/api/profile/ping`, getHeaders()).pipe(
      take(1),
      catchError(err => {
        console.clear();
        return of(err);
      }))
      .subscribe();
    }
  public ratingService(): void {
    this.http.get(`https://fw-api-gateway.herokuapp.com/api/rating/ping`, getHeaders()).pipe(
      take(1),
      catchError(err => {
        console.clear();
        return of(err);
      }))
      .subscribe();
    }

  public gateway(): void {
    this.http.get(`https://fw-api-gateway.herokuapp.com/ping`, getHeaders()).pipe(
      take(1),
      catchError(err => {
        console.clear();
        return of(err);
      }))
      .subscribe();
  }




  public pingServices() {

    console.log('Pinging services...');
    this.gateway();
    this.fileService();
    this.partnershipService();
    this.paymentService();
    this.ratingService();
    this.userService();
    console.clear();
  }
}
