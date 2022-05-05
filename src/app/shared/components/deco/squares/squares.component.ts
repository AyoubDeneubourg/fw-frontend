import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-deco-squares',
  templateUrl: './squares.component.html',
  styleUrls: ['./squares.component.scss']
})
export class SquaresComponent implements OnInit {


  @Input()
  public position: DecoSquarePosition;

  constructor() { }

  ngOnInit(): void {
    console.log(this.position);
  }

}


export type DecoSquarePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
