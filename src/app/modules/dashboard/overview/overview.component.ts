import { Component, OnInit } from '@angular/core';
import { OffersService } from 'src/app/core/services/offers/offers.service';
import { Offer } from 'src/app/shared/models/offers';
import { of } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public active: ActiveTab = 'Upcoming';

  public upcoming: Offer[] = [];
  public request: Offer[] = [];
  public history: Offer[] = [];



  public changeActiveTab(tab: ActiveTab) {
    this.active = tab;
  }

  constructor(private offersService: OffersService) { }

  ngOnInit(): void {


    this.refreshData();

    
  }


  public refreshData(): void {


    
    this.offersService.getAllPartnerships().pipe(
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

 type ActiveTab = 'Upcoming' | 'Request' | 'History';