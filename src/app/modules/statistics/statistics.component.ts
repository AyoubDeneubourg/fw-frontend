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
      console.log(data);
      this.statistics = data;
    });
  }

  public data1 = {
    'title': '5 partnerships this month',
    'content': '',
  }

  public data2 = {
    'title': 'titleee 2',
    'content': 'content 2',
  }
  
}
