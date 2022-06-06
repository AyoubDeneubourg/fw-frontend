import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AuthService, Color } from 'src/app/core/services/auth-service/auth.service';
import { StatsService } from 'src/app/core/services/stats-service/stats.service';
import { Statistics, User } from 'src/app/shared/models/common';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.scss']
})
export class EarningsComponent implements OnInit, AfterViewInit {

  @Input()
  public statistics: Statistics;


  public color: Color;

  public active: ActiveTab;


  public changeActiveTab(tab: ActiveTab) {
    this.active = tab;
  }


  constructor(private cdref: ChangeDetectorRef, private authService: AuthService) { }

  ngOnInit(): void {
    this.color = this.authService.colors;
  }

  ngAfterViewInit(): void {
    this.active = "Total";
    this.cdref.detectChanges();

  }

}
type ActiveTab = 'Total' | 'Month' | 'Week';