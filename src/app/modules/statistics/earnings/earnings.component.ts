import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/core/services/stats-service/stats.service';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.scss']
})
export class EarningsComponent implements OnInit, AfterViewInit {


  public active: ActiveTab;



  public changeActiveTab(tab: ActiveTab) {
    this.active = tab;
  }


  constructor(private cdref: ChangeDetectorRef, private statsService: StatsService) { }

  ngOnInit(): void {

    this.statsService.getTotalEarnings(14).subscribe(data => {
      console.log(data);
    })
  }

  ngAfterViewInit(): void {
    this.active = "Total";
    this.cdref.detectChanges();

  }

}
type ActiveTab = 'Total' | 'Month' | 'Week';