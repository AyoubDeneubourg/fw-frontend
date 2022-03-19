import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { User } from 'src/app/shared/models/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {


    this.user = this.authService.loggedInUser;

  }

}
