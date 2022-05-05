import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-most-used-socialmedia',
  templateUrl: './most-used-socialmedia.component.html',
  styleUrls: ['./most-used-socialmedia.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class MostUsedSocialmediaComponent implements OnInit {

  single: any[];
  

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
          "name": "Instagram",
          "value": "5"
        },
        {
          "name": "Tik-Tok",
          "value": "4"
        },
        {
          "name": "Twitter",
          "value": "3"
        },
        {
          "name": "Facebook",
          "value": "1"
        },
        {
          "name": "  ",
          "value": "0"
        },
      ];
      
  }

}
