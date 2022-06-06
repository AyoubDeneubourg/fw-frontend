import { Component, Input, OnInit } from '@angular/core';
import { Offer } from 'src/app/shared/models/offers';

@Component({
  selector: 'app-brand-to-pay',
  templateUrl: './to-pay.component.html',
  styleUrls: ['./to-pay.component.scss']
})
export class BrandToPayComponent implements OnInit {

  @Input()
  public offers: Offer[];

  constructor() { }

  ngOnInit(): void {
  }

}
