import { Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent  {




  public data1 = {
    'title': '5 partnerships this month',
    'content': '',
  }

  public data2 = {
    'title': 'titleee 2',
    'content': 'content 2',
  }
  
}
