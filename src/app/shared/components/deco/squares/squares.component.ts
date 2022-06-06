import { Component, Input, OnInit } from '@angular/core';
import { AuthService, Color } from 'src/app/core/services/auth-service/auth.service';

@Component({
  selector: 'app-deco-squares',
  templateUrl: './squares.component.html',
  styleUrls: ['./squares.component.scss']
})
export class SquaresComponent implements OnInit {


  @Input()
  public position: DecoSquarePosition;

  public color: Color;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    
    this.color = this.authService.colors;

    console.log(this.position);
  }

}


export type DecoSquarePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
