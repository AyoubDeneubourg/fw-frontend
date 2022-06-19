import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { RatingService } from 'src/app/core/services/profile/rating-service.service';
import { StatsService } from 'src/app/core/services/stats/stats.service';
import { Statistics, User } from 'src/app/shared/models/common';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit  {


  public statistics: Statistics;

  constructor(private statsService: StatsService, 
    private rateService: RatingService, 
    private authService: AuthService,
    private translocoService: TranslocoService) {
  }

  ngOnInit(): void {

    let user: User = this.authService.loggedInUser;

    this.statsService.getTotalEarnings(user.id).subscribe(data => {
      this.statistics = data;
      this.data2[0].content = "€" + this.statistics.totalMoneyEarned;
      this.data2[1].content = "€" + this.statistics.totalMoneyEarnedMonth;
      this.data2[2].content = "€" + this.statistics.totalMoneyEarnedWeek;

    });

    this.rateService.getAverageInfluencerRating(user.id).subscribe(data => {
      console.log(data);
      this.data1.title = (Math.round(data * 100) / 100).toString();
    });


    
    this.translocoService.selectTranslate('statistics.rating')
    .pipe(
      take(1),
      tap(value => {
        this.data1.content = value;
    })).subscribe();

    
  }

  public data1 = {
    'title': '',
    'content': '',
  }

  public data2 = [{
    'title': 'total',
    'content': ' ',
  },
  {
    'title': 'month',
    'content': ' ',
  },
  {
    'title': 'week',
    'content': ' ',
  }]
  
}
