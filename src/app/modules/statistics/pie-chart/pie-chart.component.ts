import { Input, ViewEncapsulation } from '@angular/core';
import { Component } from '@angular/core';
import { Statistics } from 'src/app/shared/models/common';
import { socialMediaConverter } from 'src/app/shared/models/offers';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  encapsulation: ViewEncapsulation.None

})

export class PieChartComponent  {



  private _statistics: Statistics;
    
  @Input() set statistics(value: Statistics) {
  

    if(value) {

      for (const key in value.topSocialMedia) {
    
        this.single.push({
          name: socialMediaConverter[key],
          value: value.topSocialMedia[key]
        })

      }

    }
     this._statistics = value;
  
  }
  
  get statistics(): Statistics {
  
      return this._statistics;
  
  }



  single: any[] = [];
  view: any[] = [];

  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
    domain: ['#4CADE6', '#AAAAAA', '#AZZZZZ']
  };

  constructor() {

  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
