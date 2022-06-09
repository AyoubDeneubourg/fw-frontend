import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { User } from '../../models/common';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {

  @Input() title: string;

  
  @Output() dropdownToggle = new EventEmitter<string>();


  public user: User;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {


    this.auth.loggedInUser$.pipe(
      tap((user) => {
        this.user = user;
      })).subscribe()



  }

}
