import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements AfterViewInit{

  
  @ViewChild('containerRef') containerRef : ElementRef;



  multi: any[] =  [
    {
      "name": "€",
      "series": [
        {
          "name": "2009",
          "value": "15"
        },
        {
          "name": "2010",
          "value": "856"
        },
        {
          "name": "2011",
          "value": "156"
        },
        {
          "name": "2012",
          "value": "160"
        }
      ]
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
    this.view = [width, 625]
  }



  constructor( private cdref: ChangeDetectorRef) {
    Object.assign(this, this.multi );
  }




  ngAfterViewInit(): void {
    this.view = [this.containerRef.nativeElement.offsetWidth, 625];
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