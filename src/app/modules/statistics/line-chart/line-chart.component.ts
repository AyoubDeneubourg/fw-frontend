import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements AfterViewInit{


  

  constructor( private cdref: ChangeDetectorRef) {
  }



  private _data: any;
    
  @Input() set data(value: any) {
  

    
    if(value.statistics !== undefined || typeof value.statistics !== 'undefined') {
      

      if(value.active == 'Total') {
        for (const key in value?.statistics?.totalEarningsGraphData) {
          this.multi[0].series.push({
            name: key,
            value: value.statistics.totalEarningsGraphData[key]
          })
          
        }
        
      }
      if(value.active == 'Month') {
        for (const key in value?.statistics?.totalEarningsMonthGraphData) {
          this.multi[0].series.push({
            name: key,
            value: value?.statistics?.totalEarningsGraphData[key]
          })
          
        }

      }
      if(value.active == 'Week') {

        for (const key in value?.statistics?.totalEarningsWeekGraphData) {
          this.multi[0].series.push({
            name: key,
            value: value?.statistics?.totalEarningsGraphData[key]
          })
          
        }

      }

    }


     this._data = value;
  
  }
  
  get data(): any {
      return this._data;
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
    domain: ['#4cade6']
  };



  public resizeChart(width: any): void {
    this.view = [width, 500]
  }






  ngAfterViewInit(): void {
    this.view = [this.containerRef.nativeElement.offsetWidth, 500];
    this.cdref.detectChanges();
  }



  onSelect(data): void {

  }

  onActivate(data): void {

  }

  onDeactivate(data): void {

  }
}