import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { SearchService } from 'src/app/core/services/search/search.service';
import { UserPreferencesService } from 'src/app/core/services/user-preferences/user-preferences.service';
import { COUNTRIES } from 'src/app/shared/data/countries';
import { Filters, sectors } from 'src/app/shared/models/common';
import { SocialMediaArrayCapitalized } from 'src/app/shared/models/offers';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public socialMediaArray = SocialMediaArrayCapitalized;

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

  constructor(private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private userPreferencesService: UserPreferencesService,
    private searchService: SearchService) { }

  ngOnInit(): void {
    this.buildForm();
    this.setPreferences();
    this.getInfluencers();
  }

  public getInfluencers(): void {


    this.searchService.getInfluencers().subscribe(
      (data) => {
        this.results = data;
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


  public setPreferences(): void {

    const searchPreferences: Filters = this.userPreferencesService.currentPreferences.search;

    console.log(searchPreferences);
    this.age.setValue(searchPreferences.age);
  
    // budget
    // followers
    // views


    this.gender.setValue(searchPreferences.gender);
    this.location.setValue(searchPreferences.location);

    searchPreferences.sectors.forEach((element, index) => {
      this.sectorsArray.forEach((element2, index2) => {
        if (element === element2) {
          this.sectors.controls[index2].setValue(true);
        }
      }
      );

    });


    searchPreferences.socialMedia.forEach((element, index) => {
      this.socialMediaArray.forEach((element2, index2) => {
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
