import { Component, Input, OnInit } from '@angular/core';
import { Offer } from 'src/app/shared/models/offers';

@Component({
  selector: 'app-brand-requested',
  templateUrl: './requested.component.html',
  styleUrls: ['./requested.component.scss']
})
export class BrandRequestedComponent implements OnInit {


  
  @Input()
  public offers: Offer[];
  constructor() { }

  ngOnInit(): void {
  }

}
