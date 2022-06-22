import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService, Color } from 'src/app/core/services/auth-service/auth.service';
import { RatingService } from 'src/app/core/services/profile/rating-service.service';
import { SearchService } from 'src/app/core/services/search/search.service';
import { UserPreferencesService } from 'src/app/core/services/user-preferences/user-preferences.service';
import { COUNTRIES } from 'src/app/shared/data/countries';
import { Filters, sectors } from 'src/app/shared/models/common';
import { SocialMediaArrayCapitalized } from 'src/app/shared/models/offers';

@Component({
  selector: 'app-search-brands',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchBrandsComponent implements OnInit {

  public socialMediaArrayCapitalized = SocialMediaArrayCapitalized;

  public searchFormGroup: FormGroup;

  public countries = COUNTRIES;

  public sectorsArray = sectors;



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
    this.buildForm();
    const searchPreferences: Filters = this.userPreferencesService.currentPreferences.search;

    if(!searchPreferences) {
      this.router.navigate(['/wizard']);
      return;
    }
    this.setPreferences();
    this.getBrands();
  }



  public getBrands(): void {


    this.searchService.getBrands().subscribe(
      (data) => {
        this.results = data;
        this.setPreferences();
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

    let input = document.getElementById('searchInput') as HTMLInputElement;
    
    this.newResults = this.results;

    let socialMediaArrayFiltered = [];
    let noSocialMediaChecked: boolean = true;



    this.results.forEach(profile => {
       this.socialMedia.controls.forEach((control, index) => {
        if(control.value) {
          noSocialMediaChecked = false;
          if(profile.brand.socialMedia.some(item => item.name == this.socialMediaArrayCapitalized[index].toUpperCase())) {
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
          if(profile.brand.sectors.some(item => item.sector == this.sectorsArray[index])) {
            if(sectorsArrayFiltered.indexOf(profile) === -1) {
              sectorsArrayFiltered.push(profile);
            }
          }
        }
      });
    })




    if(noSectorsChecked) sectorsArrayFiltered = [...socialMediaArrayFiltered];


      let genderArrayFiltered = [];

      
      if(this.gender.value != "any") {
        sectorsArrayFiltered.forEach(
          (element) => {
            if(element?.user?.gender?.toLowerCase() == this.gender?.value) {
              genderArrayFiltered.push(element);
            }
           
          }
        );

      } else {
        genderArrayFiltered = [...sectorsArrayFiltered];
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

      
  }


  public resetFilters() {
    this.searchFormGroup.reset();
    this.gender.setValue('any');
    this.filterAndSort();

  }

  public setPreferences(): void {

    const searchPreferences: Filters = this.userPreferencesService.currentPreferences.search;


    this.age?.setValue(searchPreferences?.age);

    this.gender?.setValue(searchPreferences?.gender);
  



    this.gender?.setValue(searchPreferences?.gender);
    this.location?.setValue(searchPreferences?.location);

    searchPreferences?.sectors?.forEach((element, index) => {
      this.sectorsArray.forEach((element2, index2) => {
        if (element === element2) {
          this.sectors.controls[index2].setValue(true);
        }
      }
      );

    });


    searchPreferences?.socialMedia?.forEach((element, index) => {
      this.socialMediaArrayCapitalized.forEach((element2, index2) => {
        if (element === element2) {
          this.socialMedia.controls[index2].setValue(true);
        }
      }
      );
    });

  }

  
  get socialMedia(): any {
    return this.searchFormGroup.get('i1.socialMedia');
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
