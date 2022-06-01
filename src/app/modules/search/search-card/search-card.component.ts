import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent implements OnInit {

  @Input()
  public data;


  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
