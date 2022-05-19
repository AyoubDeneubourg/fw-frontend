import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public active: ActiveTab = 'Request';


  public changeActiveTab(tab: ActiveTab) {
    this.active = tab;
  }

  constructor() { }

  ngOnInit(): void {
  }

}

type ActiveTab = 'Upcoming' | 'Request' | 'History';