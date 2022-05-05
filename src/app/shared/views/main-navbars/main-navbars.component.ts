import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-main-navbars',
  templateUrl: './main-navbars.component.html',
  styleUrls: ['./main-navbars.component.scss']
})
export class MainNavbarsComponent {

  @Input() public title: string;

  public dropdownActive: boolean = false;


  public dropdownToggle() {
    this.dropdownActive = !this.dropdownActive;
  }

}
