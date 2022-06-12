import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import { take, tap } from 'rxjs/operators';

import { AuthService, Color } from 'src/app/core/services/auth-service/auth.service';
import { RatingService } from 'src/app/core/services/profile/rating-service.service';
import { SearchService } from 'src/app/core/services/search/search.service';
import { UserPreferencesService } from 'src/app/core/services/user-preferences/user-preferences.service';
import { COUNTRIES } from 'src/app/shared/data/countries';
import { Filters, sectors } from 'src/app/shared/models/common';
import { Offer, SocialMediaArrayCapitalized, SocialMediaInformation } from 'src/app/shared/models/offers';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public socialMediaArrayCapitalized = SocialMediaArrayCapitalized;

  public searchFormGroup: FormGroup;

  public countries = COUNTRIES;

  public sectorsArray = sectors;


  minimumBudget: number = 100;
  maximumBudget: number = 400;
  budgetOptions: Options = {
    getSelectionBarColor: (percentage: number) => {
      return '#4cade6';
    },
    getTickColor: (percentage: number) => {
      return '#4cade6';
    },
    getPointerColor: (percentage: number) => {
      return '#4cade6';
    },
    floor: 0,
    ceil: 2500,
    step: 10,
    translate: (value: number): string => {
      return '€' + value;
    }
  };

  minimumFollowers: number = 0;
  maximumFollowers: number = 100000;
  followersOptions: Options = {
    getSelectionBarColor: (percentage: number) => {
      return '#4cade6';
    },
    getTickColor: (percentage: number) => {
      return '#4cade6';
    },
    getPointerColor: (percentage: number) => {
      return '#4cade6';
    },
    floor: 0,
    ceil: 500000,
    step: 100,
  };


  minimumViewers: number = 100;
  maximumViewers: number = 400;
  viewersOptions: Options = {
    getSelectionBarColor: (percentage: number) => {
      return '#4cade6';
    },
    getTickColor: (percentage: number) => {
      return '#4cade6';
    },
    getPointerColor: (percentage: number) => {
      return '#4cade6';
    },
    
    floor: 0,
    ceil: 1500,

  };



  public results;
  public newResults;

  public color: Color;

  constructor(private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private userPreferencesService: UserPreferencesService,
    private router: Router,
    private searchService: SearchService,
    private rateService: RatingService) { }

  ngOnInit(): void {
    this.color = this.authService.colors;
    this.setOptionsColors();
    this.buildForm();
    this.setPreferences();
    this.getInfluencers();
  }

  public setOptionsColors() {

    const color = this.color == 'blue' ? '#4cade6' : '#e5844c'

    this.viewersOptions.getSelectionBarColor = (percentage: number) => { return color; }
    this.viewersOptions.getTickColor = (percentage: number) => { return color; }
    this.viewersOptions.getPointerColor = (percentage: number) => { return color; }

    this.followersOptions.getSelectionBarColor = (percentage: number) => { return color; }
    this.followersOptions.getTickColor = (percentage: number) => { return color; }
    this.followersOptions.getPointerColor = (percentage: number) => { return color; }

    this.budgetOptions.getSelectionBarColor = (percentage: number) => { return color; }
    this.budgetOptions.getTickColor = (percentage: number) => { return color; }
    this.budgetOptions.getPointerColor = (percentage: number) => { return color; }


  }

  public getInfluencers(): void {


    this.searchService.getInfluencers().subscribe(
      (data) => {
        this.results = data;
        this.setPreferences(true);
        this.filterAndSort();
        data.forEach((element, index) => {
          this.rateService.getAverageInfluencerRating(element.user.id).pipe(
            take(1),
            tap(rate => {
              if(rate) {
                this.results[index].rate = rate;

              } else {
                this.results[index].rate = 0;
              }
              console.log(this.results);
            }
          )).subscribe()
        });
      }
    );
  }


  public buildForm(): void {

    this.searchFormGroup = this.formBuilder.group({
      i1: this.formBuilder.group({
        socialMedia: new FormArray([
          new FormControl(false),
          new FormControl(false),
          new FormControl(false),
          new FormControl(false),
          new FormControl(false),
          new FormControl(false),
          new FormControl(false)
        ]),
      }),
      i2: this.formBuilder.group({
        type: new FormArray([
          new FormControl(false),
          new FormControl(false),
          new FormControl(false)
        ]),
      }),
      i3: this.formBuilder.group({
        notes: ['0', [Validators.required]],

      }),
      i7: this.formBuilder.group({
        gender: ['both', [Validators.required]],
      }),

      i8: this.formBuilder.group({
        age: ['', [Validators.required]],
      }),

      i9: this.formBuilder.group({
        location: ['', [Validators.required]],
      }),

      i10: this.formBuilder.group({
        sectors: new FormArray([
          new FormControl(false),
          new FormControl(false),
          new FormControl(false),
          new FormControl(false),
          new FormControl(false),
          new FormControl(false),
          new FormControl(false),
          new FormControl(false),
          new FormControl(false),
          new FormControl(false),
          new FormControl(false),
          new FormControl(false),
          new FormControl(false),
          new FormControl(false),
          new FormControl(false),
        ]),
      }),


    });
  }


  public filterAndSort() {

    console.log("here");

    let input = document.getElementById('searchInput') as HTMLInputElement;
    
    this.newResults = this.results;


    let socialMediaArrayFiltered = [];
    let noSocialMediaChecked: boolean = true;



    this.results.forEach(profile => {
       this.socialMedia.controls.forEach((control, index) => {
        if(control.value) {
          noSocialMediaChecked = false;
          if(profile.influencer.socialMedia.some(item => item.name == this.socialMediaArrayCapitalized[index].toUpperCase())) {
            if(socialMediaArrayFiltered.indexOf(profile) === -1) {
              socialMediaArrayFiltered.push(profile);
            }
          }
        }
      });
    });

    if(noSocialMediaChecked) socialMediaArrayFiltered = [...this.results];
    
    
    
    let sectorsArrayFiltered = [];
    let noSectorsChecked: boolean = true;


    socialMediaArrayFiltered.forEach(profile => {
      this.sectors.controls.forEach((control, index) => {
        if(control.value) {
          noSectorsChecked = false;
          if(profile.influencer.sectors.some(item => item.sector == this.sectorsArray[index])) {
            if(sectorsArrayFiltered.indexOf(profile) === -1) {
              sectorsArrayFiltered.push(profile);
            }
          }
        }
      });
    })

    if(noSectorsChecked) sectorsArrayFiltered = [...socialMediaArrayFiltered];


    let budgetArrayFiltered = [];
    let noBudgetChecked: boolean = true;

    sectorsArrayFiltered.forEach(profile => {

        if(  (profile.influencer.storyPrice >= this.minimumBudget && profile.influencer.storyPrice <= this.maximumBudget)
          || (profile.influencer.postPrice >= this.minimumBudget && profile.influencer.postPrice <= this.maximumBudget)
          || (profile.influencer.highlightPrice >= this.minimumBudget && profile.influencer.highlightPrice <= this.maximumBudget)) {

            budgetArrayFiltered.push(profile);
            noBudgetChecked = false;
        }
  
    
      });

      if(noBudgetChecked) budgetArrayFiltered = [...sectorsArrayFiltered];





    let followersArrayFiltered = [];
    let noFollowersChecked: boolean = true;

    budgetArrayFiltered.forEach(profile => {

        if( profile.influencer.followers >= this.minimumFollowers && profile.influencer.followers <= this.maximumFollowers) {

            followersArrayFiltered.push(profile);
            noFollowersChecked = false;
        }
  
    
      });

      if(noFollowersChecked) followersArrayFiltered = [...budgetArrayFiltered];


      let genderArrayFiltered = [];

      
      if(this.gender.value != "any") {
        followersArrayFiltered.forEach(
          (element) => {
            if(element?.user?.gender?.toLowerCase() == this.gender?.value) {
              genderArrayFiltered.push(element);
            }
           
          }
        );

      } else {
        genderArrayFiltered = [...followersArrayFiltered];
      }



      let nameArrayFiltered = [];

      if(input.value.trim() !== '') {
        
        genderArrayFiltered.forEach(
          (element) => {
            let firstLastName = element.user.firstName.toLowerCase() + " " + element.user.lastName.toLowerCase();
            if(element.user.userName.toLowerCase().includes(input.value.toLowerCase()) || 
            firstLastName.includes(input.value.toLowerCase())) {
              nameArrayFiltered.push(element);
            }
          }
        );
        
      } else {
        nameArrayFiltered = [...genderArrayFiltered];
      }

      this.newResults = nameArrayFiltered;
 /*     this.newResults?.sort((a, b) => {
     if (this.order.value === 'ascending') { 
        return this.sort(a, b, 'ascending');

      } else if (this.order.value === 'descending') {
        return this.sort(a, b, 'descending');

      } 

    });
    */
  }


  public resetFilters() {
    this.searchFormGroup.reset();
    this.hoverStars = 0;
    this.clickedStars = 0;
    this.minimumBudget = 0;
    console.log(this.budgetOptions.ceil);
    this.maximumBudget = this.budgetOptions.ceil;
    console.log(this.maximumBudget);
    this.minimumFollowers = 0;
    this.maximumFollowers = this.followersOptions.ceil;
    this.gender.setValue('any');
    this.filterAndSort();

  }

  public setPreferences(fetched = false): void {

    const searchPreferences: Filters = this.userPreferencesService.currentPreferences.search;

    if(!searchPreferences) {
      this.router.navigate(['/wizard']);
      return;
    }
    this.age?.setValue(searchPreferences?.age);

    this.gender?.setValue(searchPreferences?.gender);
  
    // budget
    // followers
    // views

    console.log(searchPreferences);


    if(fetched) {

  
    if(searchPreferences?.budget?.min && !searchPreferences?.budget?.max) {

      this.budgetOptions.floor = (searchPreferences.budget.min / 2)
      this.minimumBudget = searchPreferences.budget.min;

      let maxBudget = 0;
      this.results?.forEach(profile => {
        if(profile.influencer.storyPrice > maxBudget) maxBudget = profile.influencer.storyPrice;
        if(profile.influencer.highlightPrice > maxBudget)  maxBudget = profile.influencer.highlightPrice;
        if(profile.influencer.postPrice > maxBudget) maxBudget = profile.influencer.postPrice;
        
      })

      this.maximumBudget = maxBudget;


    } else if(searchPreferences?.budget?.max && !searchPreferences?.budget?.min) {

      this.budgetOptions.floor = 0;
      this.maximumBudget = searchPreferences.budget.max;
      this.minimumBudget = 0;


    } else if(searchPreferences?.budget?.min && searchPreferences?.budget?.max) {


      this.budgetOptions.floor = (searchPreferences.budget.min / 2)
      this.minimumBudget = searchPreferences.budget.min;
      this.maximumBudget = searchPreferences.budget.max;
    }

  }

    if(searchPreferences.followers.min && searchPreferences.followers.min !== 0) {
    //  this.followersOptions.floor = (searchPreferences.followers.min / 2)
      this.minimumFollowers = searchPreferences.followers.min;
    }

    if(searchPreferences.followers.max && searchPreferences.followers.max !== 0) {
    //  this.followersOptions.ceil = (searchPreferences.followers.max / 2)
      this.maximumFollowers = searchPreferences.followers.max;
    }


    this.gender?.setValue(searchPreferences?.gender);
    this.location?.setValue(searchPreferences?.location);

    searchPreferences.sectors.forEach((element, index) => {
      this.sectorsArray.forEach((element2, index2) => {
        if (element === element2) {
          this.sectors.controls[index2].setValue(true);
        }
      }
      );

    });


    searchPreferences.socialMedia.forEach((element, index) => {
      this.socialMediaArrayCapitalized.forEach((element2, index2) => {
        if (element === element2) {
          this.socialMedia.controls[index2].setValue(true);
        }
      }
      );
    });

  }

  public hoverStars = 0;
  public clickedStars = 0;

  public clickStars(amount: number) {
    if(this.clickedStars == amount) {
      this.clickedStars =0;
      this.hoverStars = 0;

    } else {

      
      this.clickedStars = amount;
      this.hoverStars = amount;
    }
  }
  public fillStar(amount: number) {
    this.hoverStars = amount;
  }

  public unFillStar() {
    if(!this.clickedStars) {
      this.hoverStars = 0;
    } else {
      this.hoverStars = this.clickedStars;
    }
  }
  
  get socialMedia(): any {
    return this.searchFormGroup.get('i1.socialMedia');
  }

  get type(): any {
    return this.searchFormGroup.get('i2.type');
  }

  get notes(): any {
    return this.searchFormGroup.get('i3.notes');
  }





  get gender(): AbstractControl {
    return this.searchFormGroup.get('i7.gender');
  }


  get age(): AbstractControl {
    return this.searchFormGroup.get('i8.age');
  }


  get location(): AbstractControl {
    return this.searchFormGroup.get('i9.location');
  }

  get sectors(): any {
    return this.searchFormGroup.get('i10.sectors');
  }


}
