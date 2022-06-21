import { ChangeDetectorRef, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
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
  view: any[] = [undefined, 250];

  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
    domain: ['#4CADE6', '#AAAAAA', '#AZZZZZ']
  };



  ngAfterViewInit(): void {
    this.view = [this.containerRef.nativeElement.offsetWidth, 250];
    this.cdref.detectChanges();
  }

  public resizeChart(width: any): void {
    this.view = [width, 250]
  }

  
  constructor( private cdref: ChangeDetectorRef) {
  }

  
  @ViewChild('containerRef') containerRef : ElementRef;


  onSelect(data): void {

  }

  onActivate(data): void {

  }

  onDeactivate(data): void {

  }

}
