import { Component, OnInit } from '@angular/core';
import { CardData } from 'src/app/shared/components/card/card.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public data1: CardData = {
    title: 'Alexander Doe',
    content: 'Brussels,',
  }

  public data2: CardData = {
    title: '5',
    content: 'Partnerships',
    position: 'top-right'
  }

  public data3: CardData = {
    title: '8235€',
    content: 'Earned money this week',
    position: 'bottom-right'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
