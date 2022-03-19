import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public data1 = {
    'title': 'titleee',
    'content': 'content',
  }

  public data2 = {
    'title': 'titleee 2',
    'content': 'content 2',
  }
  constructor() { }

  ngOnInit(): void {
  }

}
