import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Route, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';

@Component({
  selector: 'app-left-navigation',
  templateUrl: './left-navigation.component.html',
  styleUrls: ['./left-navigation.component.scss']
})
export class LeftNavigationComponent implements OnInit {




  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {


  }


  public logout(): void {

    this.authService.logout();

  }

}
