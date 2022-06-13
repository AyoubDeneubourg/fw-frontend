import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { ProfileService } from 'src/app/core/services/profile/profile-service.service';
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

  public src;

  constructor(private auth: AuthService, private profileService: ProfileService) { }

  ngOnInit(): void {


    this.auth.loggedInUser$.pipe(
      tap((user) => {
        this.user = user;
      })).subscribe()


      this.profileService.getImage(this.user.id).pipe(
        tap((image) => {
          this.src = image;
          console.log(image);
        }
        )
        ).subscribe()


  }

}
