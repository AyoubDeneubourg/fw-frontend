import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { OffersService } from 'src/app/core/services/offers/offers.service';
import { Offer } from 'src/app/shared/models/offers';
import { of } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { AuthService, Color } from 'src/app/core/services/auth-service/auth.service';
import { User } from 'src/app/shared/models/common';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public active: ActiveTab = '1';

  public upcoming: Offer[] = [];
  public request: Offer[] = [];
  public history: Offer[] = [];

  public inProgress: Offer[] = [];

  public color: Color;


  public user: User;

  public changeActiveTab(tab: ActiveTab) {
    this.active = tab;
  }

  constructor(private offersService: OffersService, private authService: AuthService) { }

  ngOnInit(): void {
    
    this.color = this.authService.colors;
    this.user = this.authService.loggedInUser;


    this.refreshData();

    
  }


  public refreshData(): void {


    if(this.user.userType == "INFLUENCER") {
    
    this.offersService.getAllInfluencerPartnerships().pipe(
      take(1),
      tap((data) => {
 
        this.upcoming = [];
        this.request = [];
        this.history = [];


        data.forEach(element => {
          if (element.status == 'IN_PROGRESS' || element.status == 'PENDING') {
            this.upcoming.push(element);
          } if (element.status == 'REQUESTED') {
            this.request.push(element);
          } if (element.status == 'DECLINED' || element.status == 'DONE') {
            this.history.push(element);
          }
        });


      }),
      catchError(err => {
        console.log(err);
        return of(err)
      })).subscribe();

            
    }
    else {

      this.offersService.getAllBrandPartnerships().pipe(
        take(1),
        tap((data) => {
   
          this.upcoming = [];
          this.request = [];
          this.history = [];
  
  
          data.forEach(element => {
            if (element.status == 'PENDING') {
              this.upcoming.push(element);
            } 
            if (element.status == 'IN_PROGRESS') {
              this.inProgress.push(element);
            } 
            if (element.status == 'REQUESTED') {
              this.request.push(element);
            } if (element.status == 'DECLINED' || element.status == 'DONE') {
              this.history.push(element);
            }
          });
  
        }),
        catchError(err => {
          console.log(err);
          return of(err)
        })).subscribe();




    }

/* 
    this.offersService.getUpcoming().pipe(
      take(1),
      tap((data) => {
        this.upcoming = data;
      }),
      catchError(err => {
        return of(err)
      })).subscribe();



    this.offersService.getHistory().pipe(
      take(1),
      tap((data) => {
        this.history = data;
      }),
      catchError(err => {
        return of(err)
      })).subscribe();



    this.offersService.getRequested().pipe(
      take(1),
      tap((data) => {
        this.request = data;
      }),
      catchError(err => {
        return of(err)
      })).subscribe(); */
  }

}

 type ActiveTab = '1' | '2' | '3' | '4';