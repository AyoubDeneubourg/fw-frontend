import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';

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


  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.active = "Total";

  }

}
type ActiveTab = 'Total' | 'Month' | 'Week';