import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-navbars',
  templateUrl: './main-navbars.component.html',
  styleUrls: ['./main-navbars.component.scss']
})
export class MainNavbarsComponent {

  @Input() public title: string;



}
