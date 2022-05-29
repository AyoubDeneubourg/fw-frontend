import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { Brand } from 'src/app/shared/models/brand';
import { User } from 'src/app/shared/models/common';
import { Influencer } from 'src/app/shared/models/influencer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: User;

  public influencer: Influencer;
  public brand: Brand;

  public type: ProfileType;

  public isOther: boolean = false;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    

    if(this.route.snapshot.params.id) {

      this.authService.getUser(this.route.snapshot.params.id).subscribe(user => {
        this.isOther = true;
        this.user = user;

        console.log(this.user);
      },error => {
        this.router.navigate(['/']);
      });


    } else {
      this.user = this.authService.loggedInUser;

      if(this.user.userType == "BRAND") {
        this.brand = this.authService.loggedInBrand;
        this.type = 'BRAND';
      } else {
        this.influencer = this.authService.loggedInInfluencer;
        this.type = "INFLUENCER"
      }
    }


  }

  public sendOffer() {
    
  }

}

export type ProfileType = 'INFLUENCER' | 'BRAND';