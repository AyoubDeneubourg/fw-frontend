import { Component, Input, OnInit } from '@angular/core';
import { Color } from 'src/app/core/services/auth-service/auth.service';
import { DecoSquarePosition } from '../squares/squares.component';

@Component({
  selector: 'app-deco-wizard-squares',
  templateUrl: './wizard-squares.component.html',
  styleUrls: ['./wizard-squares.component.scss']
})
export class WizardSquaresComponent implements OnInit {

  @Input()
  public position: DecoSquarePosition;

  @Input()
  public color: Color;

  constructor() { }

  ngOnInit(): void {
  }

}
