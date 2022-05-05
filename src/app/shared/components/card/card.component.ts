import { Component, Input, OnInit } from '@angular/core';
import { DecoSquarePosition } from '../deco/squares/squares.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() data: CardData;

  constructor() { }

  ngOnInit(): void {
  }

}

export type CardData = {

  title: string,
  subtitle?: string,
  content: string,
  position?: DecoSquarePosition;
}

