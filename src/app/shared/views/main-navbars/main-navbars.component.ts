import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';


@Component({
  selector: 'app-main-navbars',
  templateUrl: './main-navbars.component.html',
  styleUrls: ['./main-navbars.component.scss']
})
export class MainNavbarsComponent {

  @Input() public title: string;

  public dropdownActive: boolean = false;

  constructor(private authService: AuthService) {}

  public dropdownToggle() {
    this.dropdownActive = !this.dropdownActive;
  }


  public logout(): void {

    this.authService.logout();

  }
}
