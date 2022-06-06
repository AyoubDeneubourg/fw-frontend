import { Component, Input, OnInit } from '@angular/core';
import { Offer } from 'src/app/shared/models/offers';

@Component({
  selector: 'app-brand-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class BrandHistoryComponent implements OnInit {

  
  @Input()
  public offers: Offer[];

  
  constructor() { }

  ngOnInit(): void {
  }

}
