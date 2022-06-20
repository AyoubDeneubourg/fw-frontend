import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { AuthService, Color } from 'src/app/core/services/auth-service/auth.service';
import { ProfileService } from 'src/app/core/services/profile/profile-service.service';
import { RatingService } from 'src/app/core/services/profile/rating-service.service';
import { COUNTRIES } from 'src/app/shared/data/countries';
import { Profile, User } from 'src/app/shared/models/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profile: Profile;
  public user: User;

  public color: Color;

  public ratings;

  public countryList = COUNTRIES;
  
  public type: ProfileType;

  public isOther: boolean = false;

  constructor(private location: Location, private authService: AuthService, private rateService: RatingService, private router: Router, private route: ActivatedRoute, private profileService: ProfileService) { }

  ngOnInit(): void {


    this.authService.loggedInUser$.pipe(
      tap((user) => {
        this.user = user;

      })).subscribe()

   // this.user = this.authService.loggedInUser;


    

    if(this.route.snapshot.params.id) {


      this.authService.getProfile(this.route.snapshot.params.id).subscribe(data => {



        if(!data) this.location.back();
        
        if(this.authService.loggedInUser.id != this.route.snapshot.params.id) {
          this.isOther = true;
        }
        if(data.user.userType == "INFLUENCER") {
          this.profile = { ...data.user, ...data.influencer};
          this.type = 'INFLUENCER';

          this.setInfluencerRating(this.route.snapshot.params.id);

          }
        if(data.user.userType == "BRAND") {
          this.profile = { ...data.user, ...data.brand};
          this.type = 'BRAND';

          this.setBrandRating(this.route.snapshot.params.id);


        }

    
      },error => {
        this.router.navigate(['/']);
      });


    } else {

      
    
      
      if(this.user.userType == "BRAND") {

        this.profile = {...this.user, ...this.authService.loggedInBrand['brand']};

        this.type = 'BRAND';

        if(!this.profile.headTitle && !this.profile.description ) {
          this.router.navigateByUrl('/profile/setup');
        }
        this.setBrandRating(this.authService.loggedInUser.id);





      } else {

        this.profile = { ...this.user, ...this.authService.loggedInInfluencer['influencer'] };
        
        this.type = "INFLUENCER"

        if(!this.profile.headTitle && !this.profile.description ) {
          this.router.navigateByUrl('/profile/setup');
        }
        this.setInfluencerRating(this.authService.loggedInUser.id);


        this.rateService.getAverageInfluencerRating(this.profile.id).subscribe(data => {
           
         })
      
      
      }
    }

    this.color = this.authService.colors;





  }


  public setInfluencerRating(id) {

    this.rateService.getInfluencerRating(id).subscribe(data => {
      this.ratings = data;

      data.forEach((element, index) => {
        
       this.authService.getUser(element.brandId.toString()).pipe(
         take(1),
         tap(user => {
           this.ratings[index].user = user;

         })).subscribe()
       }
      );
       
     })
    

  }

  public setBrandRating(id) {
    

    this.rateService.getBrandRating(id).subscribe(data => {
      this.ratings = data;

      data.forEach((element, index) => {
        
       this.authService.getUser(element.influencerId.toString()).pipe(
         take(1),
         tap(user => {
           this.ratings[index].user = user;

         }
         )
         ).subscribe()
       }
      );
       
     })


  }


  fileChange(event) {
    let fileList: FileList = event.target.files;



    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('file', file, file.name);


        this.profileService.postFile(formData, this.user.id).subscribe(data => {
          location.href = '/profile';

        }
        );

    }
}

}

export type ProfileType = 'INFLUENCER' | 'BRAND';