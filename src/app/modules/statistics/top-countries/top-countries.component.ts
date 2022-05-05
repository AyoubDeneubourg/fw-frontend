import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-countries',
  templateUrl: './top-countries.component.html',
  styleUrls: ['./top-countries.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopCountriesComponent {

  single: any[] = [
    {
      "name": "Germany",
      "value": 2
    },
    {
      "name": "USA",
      "value": 4
    },
    {
      "name": "France",
      "value": 1
    },
    {
      "name": "Perro",
      "value": 1
    }
  ];
  view: any[] = [];

  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
    domain: ['#4CADE6', '#AAAAAA', '#AZZZZZ']
  };

  constructor() {
    Object.assign(this, this.single );
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