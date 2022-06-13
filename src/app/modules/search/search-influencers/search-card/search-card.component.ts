import { Component, Input, OnInit } from '@angular/core';
import { AuthService, Color } from 'src/app/core/services/auth-service/auth.service';
import { COUNTRIES } from 'src/app/shared/data/countries';

@Component({
  selector: 'app-search-influencer-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchInfluencerCardComponent implements OnInit {

  @Input()
  public data;


  public color: Color;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.color = this.authService.colors;
  }


  public countries = COUNTRIES;
}
