import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService, Color } from 'src/app/core/services/auth-service/auth.service';
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
    ceil: 1000,
    step: 10,
    translate: (value: number): string => {
      return '$' + value;
    }
  };

  minimumFollowers: number = 1000;
  maximumFollowers: number = 10000;
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
    ceil: 15000,
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
    private searchService: SearchService) { }

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
        this.filterAndSort();
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

    this.newResults = sectorsArrayFiltered;
    this.newResults?.sort((a, b) => {
/*       if (this.order.value === 'ascending') { */
        return this.sort(a, b, 'ascending');
/* 
      } else if (this.order.value === 'descending') {
        return this.sort(a, b, 'descending');

      } */

    });

  }


  private sort(a: Offer | any, b: Offer | any, order: 'ascending' | 'descending'): number {

    if (this.type.value === 'new') {
      a = a.id;
      b = b.id;

    } else if (this.type.value === 'time') {
      a = a.startDate;
      b = b.startDate;

    } else if (this.type.value === 'client') {
      a = a.brandId;
      b = b.brandId;

    } else if (this.type.value === 'status') {
      a = a.status;
      b = b.status;

    } else if (this.type.value === 'amount') {
      let amountA = 0;
      let amountB = 0;


      a.socialMediaDetails.forEach((element: SocialMediaInformation) => {
        amountA += element?.posts + element?.stories + element?.highlights;
      });

      b.socialMediaDetails.forEach((element: SocialMediaInformation) => {
        amountB += element?.posts + element?.stories + element?.highlights;
      });


      a = amountA;
      b = amountB;
    }

    if (b < a) return order === 'ascending' ? 1 : -1;
    if (b > a) return order === 'ascending' ? -1 : 1;
    return 0;

  }

  public resetFilters() {
    this.searchFormGroup.reset();
    this.hoverStars = 0;
    this.clickedStars = 0;
    this.gender.setValue('both');
    this.filterAndSort();

  }

  public setPreferences(): void {

    const searchPreferences: Filters = this.userPreferencesService.currentPreferences.search;

    if(!searchPreferences) {
      this.router.navigate(['/wizard']);
      return;
    }
    this.age?.setValue(searchPreferences?.age);
  
    // budget
    // followers
    // views


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
