import { Component, Input, OnInit } from '@angular/core';
import { AuthService, Color } from 'src/app/core/services/auth-service/auth.service';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent implements OnInit {

  @Input()
  public data;


  public color: Color;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.color = this.authService.colors;
  }

}
