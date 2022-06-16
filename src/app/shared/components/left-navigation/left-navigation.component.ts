import { Component, OnInit } from '@angular/core';
import { AuthService, Color } from 'src/app/core/services/auth-service/auth.service';
import { User } from '../../models/common';

@Component({
  selector: 'app-left-navigation',
  templateUrl: './left-navigation.component.html',
  styleUrls: ['./left-navigation.component.scss']
})
export class LeftNavigationComponent implements OnInit {


  public color: Color;
  public user: User;



  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.color = this.authService.colors;
    this.user = this.authService.loggedInUser;

  }


  public logout(): void {

    this.authService.logout();

  }

  ngAfterViewInit(): void {
  //  this.introService.featureOne();

    
   // 
}

}
