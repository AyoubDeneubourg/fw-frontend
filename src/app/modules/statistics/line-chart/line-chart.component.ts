import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Statistics } from 'src/app/shared/models/common';
import { socialMediaConverter } from 'src/app/shared/models/offers';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements AfterViewInit{


  

  constructor( private cdref: ChangeDetectorRef) {
  }

  
  private _statistics: Statistics;
    
  @Input() set statistics(value: Statistics) {
  
    if(value) {

      for (const key in value.totalEarningsGraphData) {
    
        this.multi[0].series.unshift({
          name: key,
          value: value.totalEarningsGraphData[key]
        })
        
      }

    }
     this._statistics = value;
  
  }
  
  get statistics(): Statistics {
      return this._statistics;
  }


  @ViewChild('containerRef') containerRef : ElementRef;



  multi: any[] =  [
    {
      "name": "Total",
      "series": []
    }
  ]


  view = null;

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };



  public resizeChart(width: any): void {
    this.view = [width, 500]
  }






  ngAfterViewInit(): void {
    this.view = [this.containerRef.nativeElement.offsetWidth, 500];
    this.cdref.detectChanges();
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