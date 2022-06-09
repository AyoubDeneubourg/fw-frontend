import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectBankAccountForSetupOptions } from '@stripe/stripe-js';
import { AuthService, Color } from 'src/app/core/services/auth-service/auth.service';
import { ProfileService } from 'src/app/core/services/profile/profile-service.service';
import { COUNTRIES } from 'src/app/shared/data/countries';
import { Brand } from 'src/app/shared/models/brand';
import { Profile, User } from 'src/app/shared/models/common';
import { Influencer } from 'src/app/shared/models/influencer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profile: Profile;
  public user: User;

  public color: Color;


  public countryList = COUNTRIES;
  
  public type: ProfileType;

  public isOther: boolean = false;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private profileService: ProfileService) { }

  ngOnInit(): void {

    

    if(this.route.snapshot.params.id) {

      this.authService.getProfile(this.route.snapshot.params.id).subscribe(data => {

        
        this.isOther = true;
        if(data.user.userType == "INFLUENCER") {
          this.profile = { ...data.user, ...data.influencer};
          }
        if(data.user.userType == "BRAND") {
          this.profile = { ...data.user, ...data.brand};

        }

    
      },error => {
        this.router.navigate(['/']);
      });


    } else {
      this.user = this.authService.loggedInUser;

      if(this.user.userType == "BRAND") {

        this.profile = {...this.authService.loggedInBrand['user'], ...this.authService.loggedInBrand['brand']};
        this.type = 'BRAND';

      } else {

        this.profile = {...this.authService.loggedInInfluencer['user'], ...this.authService.loggedInInfluencer['influencer']};
        this.type = "INFLUENCER"
      }
    }

    this.color = this.authService.colors;

/* 
    if(!this.profile.headTitle && !this.profile.description ) {
      this.router.navigateByUrl('/profile/edit');
    }
 */


  }


  public sendOffer() {
    
  }

  public changeProfile() {
    
  }


  fileChange(event) {
    let fileList: FileList = event.target.files;



    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('file', file, file.name);


        this.profileService.postFile(formData, this.user.id).subscribe(data => {
          // refrsh page
        }
        );

    }
}

}

export type ProfileType = 'INFLUENCER' | 'BRAND';