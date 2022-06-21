import { Component, OnInit } from '@angular/core';
import { AuthService, Color } from 'src/app/core/services/auth-service/auth.service';
import { User } from '../../models/common';

@Component({
  selector: 'app-bottom-navigation-sm',
  templateUrl: './bottom-navigation-sm.component.html',
  styleUrls: ['./bottom-navigation-sm.component.scss']
})
export class BottomNavigationSmComponent implements OnInit {

  public color: Color;
  public user: User;



  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.color = this.authService.colors;
    this.user = this.authService.loggedInUser;

  }
}
