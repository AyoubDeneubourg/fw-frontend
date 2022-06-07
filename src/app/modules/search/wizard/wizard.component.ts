import { Component, OnInit } from '@angular/core';


import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService, Color } from 'src/app/core/services/auth-service/auth.service';
import { SocialMediaArrayCapitalized } from 'src/app/shared/models/offers';
import { PageNavigation } from 'src/app/shared/models/pagination';
import { tap } from 'rxjs/operators'
import { COUNTRIES } from 'src/app/shared/data/countries';
import { matchValues } from 'src/app/shared/static/forms/password-validation';
import { Filters, sectors } from 'src/app/shared/models/common';
import { UserPreferences, UserPreferencesService } from 'src/app/core/services/user-preferences/user-preferences.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

  public socialMediaArray = SocialMediaArrayCapitalized;
  
  public countries = COUNTRIES;
  public sectorsArray = sectors;

  public wizardFormGroup: FormGroup;

  public actualPage: number = 1;
  public allowToGo: number = 1;

  public color: Color;

  public allPages: PageNavigation[] = [
    {
      title: 'Budget',
      currentStatus: 'Active',
    },
    {
      title: 'Choose platforms',
      currentStatus: 'Future',
    },
    {
      title: 'Amount of followers',
      currentStatus: 'Future',
    },
    {
      title: 'Amount of viewers',
      currentStatus: 'Future',
    },
    {
      title: 'Gender and age',
      currentStatus: 'Future',
    },
    {
      title: 'Sector',
      currentStatus: 'Future',
    },
    {
      title: 'Localisation',
      currentStatus: 'Future',
    }
  ];

  constructor(private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private userPreferencesService: UserPreferencesService) { }

  ngOnInit(): void {

    this.color = this.authService.colors;

    this.wizardFormGroup = this.formBuilder.group({
      p1: this.formBuilder.group({
        minimumBudget: ["", []],
        maximumBudget: ["", []],
      }),

      p2: this.formBuilder.group({
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

      p3: this.formBuilder.group({
        minimumFollowers: ["", []],
        maximumFollowers: ["", []],

      }),

      p4: this.formBuilder.group({
        minimumViewers: ["", []],
        maximumViewers: ["", []],

      }),

      p5: this.formBuilder.group({
        gender: ['both', []],
        age: ['', []],
      }),


      p6: this.formBuilder.group({
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

      p7: this.formBuilder.group({
        country: ['BE', []],
      }),

    });


  }



  goToPage(page: number): void {

    if (page === 1) {
      this.setCurrentPages(1);
    }


    if (page === 2) {
      if (this.page1.valid) {
          this.setCurrentPages(2);
      } else {
          this.goToPage(1);
          this.wizardFormGroup.controls[Object.keys(this.wizardFormGroup.controls)[this.actualPage - 1]].markAllAsTouched();
      }
    }


    if (page === 3) {
      if (this.page1.valid && this.page2.valid) {
          this.setCurrentPages(3);
      } else {
          this.goToPage(2);
          this.wizardFormGroup.controls[`p${this.actualPage}`].markAllAsTouched();
      }
    }


    if (page === 4) {
      if (this.page1.valid && this.page2.valid && this.page3.valid) {
        this.setCurrentPages(4);
      } else {
        this.goToPage(3);
        this.wizardFormGroup.controls[`p${this.actualPage}`].markAllAsTouched();
      }
    }

    if (page === 5) {
      if (this.page1.valid && this.page2.valid && this.page3.valid && this.page4.valid) {
          this.setCurrentPages(5);

      } else {

        this.goToPage(4);
        this.wizardFormGroup.controls[`p${this.actualPage}`].markAllAsTouched();
      }
    }


    if (page === 6) {
      if (this.page1.valid && this.page2.valid && this.page3.valid && this.page4.valid) {
        this.setCurrentPages(6);

      } else {

        this.goToPage(5);
        this.wizardFormGroup.controls[`p${this.actualPage}`].markAllAsTouched();
      }
    }


    if (page === 7) {
      if (this.page1.valid && this.page2.valid && this.page3.valid && this.page4.valid) {
        this.setCurrentPages(7);

      } else {

        this.goToPage(6);
        this.wizardFormGroup.controls[`p${this.actualPage}`].markAllAsTouched();
      }
    }

  }



  setCurrentPages(newPage: number): void {
    if (this.actualPage !== newPage) {
      this.allPages[newPage - 1].currentStatus = 'Active';

      if (this.wizardFormGroup.controls[Object.keys(this.wizardFormGroup.controls)[this.actualPage - 1]].valid) {
            this.allPages[this.actualPage - 1].currentStatus = 'Valid';
      } else {
            this.allPages[this.actualPage - 1].currentStatus = 'Future';
      }
    }

    this.actualPage = newPage;

  }




  onSubmit(): void {


    let sectors = [];
    let socialMedia = [];

     this.sectors.value.forEach((element: string, index: number) => {
       if (element) {
        sectors.push(this.sectorsArray[index])
       }
     });


     this.socialMedia.value.forEach((element: string, index: number) => {
      if(element) {
        socialMedia.push(this.socialMediaArray[index]);
      }
     })

     console.log(sectors);


    const search: Filters = {

        budget: {
          min: this.minimumBudget.value,
          max: this.maximumBudget.value
        },
        followers: {
          min: this.minimumFollowers.value,
          max: this.maximumFollowers.value
        },
        views: {
          min: this.minimumViewers.value,
          max: this.maximumViewers.value,
  
        },
        gender: this.gender.value,
        age: this.age.value,
        location: this.country.value,
        sectors: sectors,
        socialMedia: socialMedia
      
    };

    this.userPreferencesService.update({search})
    this.router.navigate(['/search']);
    
    if (this.wizardFormGroup.invalid) {

      // this.goToPage(5)
      this.wizardFormGroup.markAllAsTouched()

    } else {



    }



  }





  get page1(): AbstractControl {
    return this.wizardFormGroup.controls.p1;
  }

  get page2(): AbstractControl {
    return this.wizardFormGroup.controls.p2;
  }

  get page3(): AbstractControl {
    return this.wizardFormGroup.controls.p3;
  }

  get page4(): AbstractControl {
    return this.wizardFormGroup.controls.p4;
  }

  get page5(): AbstractControl {
    return this.wizardFormGroup.controls.p5;
  }

  get page6(): AbstractControl {
    return this.wizardFormGroup.controls.p5;
  }



  get minimumBudget(): AbstractControl {
    return this.wizardFormGroup.get('p1.minimumBudget');
  }

  get maximumBudget(): AbstractControl {
    return this.wizardFormGroup.get('p1.maximumBudget');
  }

  
  get socialMedia(): any {
    return this.wizardFormGroup.get('p2.socialMedia');
  }


  get minimumFollowers(): AbstractControl {
    return this.wizardFormGroup.get('p3.minimumFollowers');
  }
  get maximumFollowers(): AbstractControl {
    return this.wizardFormGroup.get('p3.maximumFollowers');
  }



  get minimumViewers(): AbstractControl {
    return this.wizardFormGroup.get('p4.minimumViewers');
  }
  get maximumViewers(): AbstractControl {
    return this.wizardFormGroup.get('p4.maximumViewers');
  }


  get gender(): AbstractControl {
    return this.wizardFormGroup.get('p5.gender');
  }

  get age(): AbstractControl {
    return this.wizardFormGroup.get('p5.age');
  }


  get sectors(): any {
    return this.wizardFormGroup.get('p6.sectors');
  }


  get country(): any {
    return this.wizardFormGroup.get('p7.country');
  }



}
