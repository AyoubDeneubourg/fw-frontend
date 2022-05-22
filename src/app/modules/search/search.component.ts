import { Component, OnInit } from '@angular/core';
import { SocialMediaArrayCapitalized } from 'src/app/shared/models/offers';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public socialMediaArray = SocialMediaArrayCapitalized;


  constructor() { }

  ngOnInit(): void {
  }

}
