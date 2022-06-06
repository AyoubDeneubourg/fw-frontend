import { Component, Input, OnInit } from '@angular/core';
import { AuthService, Color } from 'src/app/core/services/auth-service/auth.service';
import { DecoSquarePosition } from '../deco/squares/squares.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() data: CardData;
  public color: Color;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    
    this.color = this.authService.colors;

  }

}

export type CardData = {

  title: string,
  subtitle?: string,
  content: string,
  position?: DecoSquarePosition;
}

