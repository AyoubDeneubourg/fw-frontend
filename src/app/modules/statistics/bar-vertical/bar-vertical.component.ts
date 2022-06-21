import { ChangeDetectorRef, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Statistics } from 'src/app/shared/models/common';

@Component({
  selector: 'app-bar-vertical',
  templateUrl: './bar-vertical.component.html',
  styleUrls: ['./bar-vertical.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BarVerticalComponent implements OnInit {


  @ViewChild('containerRef') containerRef : ElementRef;

  
  private _statistics: any;
    
  @Input() set statistics(value: any) {
  
    if(value !== undefined || typeof value !== 'undefined') {
      

      let arr = [];

      for (const item in value.topMonths) {

        arr.push({
          "name": item,
          "value": value.topMonths[item]
        })
      }
 

      let x = arr.sort((a, b) => (a.name < b.name) ? -1 : 1);


      const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];


      let y = [];

      y.push({
          "name": "",
          "value": "0"
      })
      x.forEach(element => {
        y.push({
          "name": month[element.name],
          "value": element.value
        });
      });

      y.push({
        "name": " ",
        "value": "0"
    })

      this.single = y;
      this._statistics = y;

    }


  
  }
  
  get statistics(): any {
      return this._statistics;
  }



  public resizeChart(width: any): void {
    this.view = [width, 500]
  }

  
  ngAfterViewInit(): void {
    this.view = [this.containerRef.nativeElement.offsetWidth, 500];
    this.cdref.detectChanges();
  }



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

  constructor(private cdref: ChangeDetectorRef) {
    Object.assign(this, this.single )
  }

  onSelect(event) {

  }

  ngOnInit(): void {
      
 

 
      
  }
}