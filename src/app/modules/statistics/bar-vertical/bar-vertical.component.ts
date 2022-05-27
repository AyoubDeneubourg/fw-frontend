import { Input, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Statistics } from 'src/app/shared/models/common';

@Component({
  selector: 'app-bar-vertical',
  templateUrl: './bar-vertical.component.html',
  styleUrls: ['./bar-vertical.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BarVerticalComponent implements OnInit {


  @Input()
  public statistics: Statistics;


  public single: any[];
  

  view: any[] = [undefined, 200];

  // options
  showXAxis = true;
  showYAxis = true;
  
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  showYAxisLabel = false;

  colorScheme = {
    domain: ['#4CADE6']
  };

  constructor() {
    Object.assign(this, this.single )
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit(): void {
      

      this.single = [
        {
          "name": "",
          "value": "0"
        },
        {
          "name": "January",
          "value": "1000"
        },
        {
          "name": "March",
          "value": "400"
        },
        {
          "name": "May",
          "value": "325"
        },
        {
          "name": "April",
          "value": "135"
        },
        {
          "name": "  ",
          "value": "0"
        },
      ];
      
  }
}