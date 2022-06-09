import { Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { StatsService } from 'src/app/core/services/stats-service/stats.service';
import { Statistics, User } from 'src/app/shared/models/common';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit  {


  public statistics: Statistics;

  constructor(private statsService: StatsService, private authService: AuthService) {
  }

  ngOnInit(): void {

    let user: User = this.authService.loggedInUser;

    this.statsService.getTotalEarnings(user.id).subscribe(data => {
      this.statistics = data;
      this.data2[0].content = "€" + this.statistics.totalMoneyEarned;
      this.data2[1].content = "€" + this.statistics.totalMoneyEarnedMonth;
      this.data2[2].content = "€" + this.statistics.totalMoneyEarnedWeek;

    });
  }

  public data1 = {
    'title': '5 partnerships this month',
    'content': '',
  }

  public data2 = [{
    'title': 'Total earned',
    'content': ' ',
  },
  {
    'title': 'Earned this month',
    'content': ' ',
  },
  {
    'title': 'Earned this week',
    'content': ' ',
  }]
  
}
