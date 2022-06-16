import { Component, OnInit } from '@angular/core';


import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService, Color } from 'src/app/core/services/auth-service/auth.service';
import { SocialMediaArray, SocialMediaArrayCapitalized } from 'src/app/shared/models/offers';
import { PageNavigation } from 'src/app/shared/models/pagination';
import { COUNTRIES } from 'src/app/shared/data/countries';
import { sectors, User } from 'src/app/shared/models/common';
import { UserPreferencesService } from 'src/app/core/services/user-preferences/user-preferences.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LANGUAGES } from 'src/app/shared/data/languages';
import { ProfileService } from 'src/app/core/services/profile/profile-service.service';


@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupProfileComponent implements OnInit {

  public socialMediaArray = SocialMediaArrayCapitalized;

  public availableLanguages = LANGUAGES;

  public availableCountries = COUNTRIES;
  public availableSectors = sectors;
  public availableSocialMedias = SocialMediaArray;
  
  public sectorsArray = sectors;

  public wizardFormGroup: FormGroup;

  public actualPage: number = 1;
  

  public color: Color;

  public allPages: PageNavigation[] = [
    {
      title: 'profile.setup.personalInformation',
      currentStatus: 'Active',
    },
    {
      title: 'profile.setup.languages',
      currentStatus: 'Future',
    },
    {
      title: 'profile.setup.sectors',
      currentStatus: 'Future',
    },
    {
      title: 'profile.setup.countries',
      currentStatus: 'Future',
    },
    {
      title: 'profile.setup.homeDetails',
      currentStatus: 'Future',
    },
    {
      title: 'profile.setup.socialMedia',
      currentStatus: 'Future',
    }
  ];

  public authedUser: User;


  constructor(private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private location: Location,
    private profileService: ProfileService,
    private userPreferencesService: UserPreferencesService) { }

  ngOnInit(): void {

    this.authedUser = this.authService.loggedInUser;


    if(this.authedUser.userType == "INFLUENCER") {
      this.allPages.push(
        {
          title: 'profile.setup.influencerDetails',
          currentStatus: 'Future',
        }
      )
    }
    this.color = this.authService.colors;

    this.wizardFormGroup = this.formBuilder.group({
      p1: this.formBuilder.group({
        headtitle: ["", [Validators.required]],
        description: ["", [Validators.required]],
      }),

      p2: this.formBuilder.group({ }),

      p3: this.formBuilder.group({ }),


      p4: this.formBuilder.group({ }),


      p5: this.formBuilder.group({
        country: ['BE', [Validators.required]],
        city: ['', [Validators.required]],
        address: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],

      }),

    
      p6: this.formBuilder.group({
      }), 
      p7: this.formBuilder.group({
        followers: ['', [Validators.required]],
        pricePerPost: ['', [Validators.required]],
        pricePerStory: ['', [Validators.required]],
        pricePerHighlight: ['', [Validators.required]],
        ibanNumber: ['', [Validators.required]],

      }), 

    });


  
  }

  public languageValid = false;
  public sectorValid = false;
  public countryValid = false;

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
      if (this.page1.valid && this.languageList.length) {
          this.setCurrentPages(3);
          this.languageValid = false;
      } else {
          this.languageValid = true;
          this.goToPage(2);
          this.wizardFormGroup.controls[`p${this.actualPage}`].markAllAsTouched();
      }
    }


    if (page === 4) {
      if (this.page1.valid && this.languageList.length && this.sectorList.length) {
        this.setCurrentPages(4);
        this.sectorValid = false;
      } else {
        this.sectorValid = true;
        this.goToPage(3);
        this.wizardFormGroup.controls[`p${this.actualPage}`].markAllAsTouched();
      }
    }

    if (page === 5) {
      if (this.page1.valid && this.languageList.length && this.sectorList.length && this.countryList.length) {

          this.setCurrentPages(5);
          this.countryValid = false;
      } else {
        this.countryValid = true;

        this.goToPage(4);
        this.wizardFormGroup.controls[`p${this.actualPage}`].markAllAsTouched();
      }
    }


    if (page === 6) {
      if (this.page1.valid && this.languageList.length && this.sectorList.length && this.countryList.length && this.page5.valid) {
        this.setCurrentPages(6);

      } else {

        this.goToPage(5);
        this.wizardFormGroup.controls[`p${this.actualPage}`].markAllAsTouched();
      }
    }

    if (page === 7) {
      if (this.page1.valid && this.languageList.length && this.sectorList.length && this.countryList.length  && this.page5.valid) {
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


  public returnBack() {
    console.log(this.location.back());
    this.location.back();
  }



  onSubmit(): void {


    console.log('here')
    
    
    if (this.wizardFormGroup.invalid) {
      console.log('here')
      
      this.wizardFormGroup.markAllAsTouched()
      
    } else {
      console.log('here')

      let PROFILE: any = {
        "user": {
  
          "address": this.address.value,
          "city": this.city.value,
          "postalCode": this.postalCode.value,
          "country": this.country.value,
      },
      };
      

    let socialMediaList = [];

   

    this.socialMediaList.forEach((element: any) => {

      let x = document.getElementById('link-' + element.name) as HTMLSelectElement;
      socialMediaList.push({
        name: element.name.toUpperCase(),
        link: x.value
      });
    }); 

    let languageList = this.languageList.map(elem => ({ language: elem, } ));
    let sectorList = this.sectorList.map(elem => ({ sector: elem, } ));
    let countryList = this.countryList.map(elem => ({ country: elem, } ));


    if(this.authedUser.userType == "INFLUENCER") {

      PROFILE.influencer = {};
      PROFILE.influencer.languages = languageList;
      PROFILE.influencer.sectors = sectorList;
      PROFILE.influencer.countries = countryList;
      PROFILE.influencer.socialMedia = socialMediaList;
      PROFILE.influencer.pricePerHighlight = this.pricePerHighlight.value;
      PROFILE.influencer.pricePerPost = this.pricePerPost.value;
      PROFILE.influencer.pricePerStory = this.pricePerStory.value;
      PROFILE.influencer.followers = this.followers.value;
      PROFILE.influencer.ibanNumber = this.ibanNumber.value;

      this.profileService.updateInfluencerProfile(PROFILE, this.authedUser.id).subscribe(res => {
      });
      
    } else {
      
      PROFILE.brand = {};

      PROFILE.brand.languages = languageList;
      PROFILE.brand.sectors = sectorList;
      PROFILE.brand.countries = countryList;
      PROFILE.brand.socialMedia = socialMediaList;

      this.profileService.updateBrandProfile(PROFILE, this.authedUser.id).subscribe(res => {
      });
    }


    }


  }


  public languageList = [];


  public removeLanguage(item: string) {

    this.languageList.splice(this.languageList.indexOf(item), 1);
  }

  public addLanguage() {
    let select = document.getElementById('selectLanguages') as HTMLSelectElement;
    this.languageList.indexOf(select.value) === -1 && this.languageList.push(select.value);
  }


  
  public sectorList = [];

  public removeSector(item: string) {
      this.sectorList.splice(this.sectorList.indexOf(item), 1);
  }

  public addSector() {
    let select = document.getElementById('selectSectors') as HTMLSelectElement;
    this.sectorList.indexOf(select.value) === -1 && this.sectorList.push(select.value);
  }



  
  public countryList = [];


  public removeCountry(item: string) {

      this.countryList.splice(this.countryList.indexOf(item), 1);
    
  }

  public addCountry() {
    let select = document.getElementById('selectCountries') as HTMLSelectElement;
    this.countryList.indexOf(select.value) === -1 && this.countryList.push(select.value);
  }


  public socialMediaList = [];


  public removeSocialMedia(item: any) {
    if(this.socialMediaList.length === 1) {
      console.log("minimum 1")
    } else {

      var index = this.socialMediaList.findIndex(e => e.name === item.name);
      if (index !== -1) {
        this.socialMediaList.splice(index, 1);
      }

    }
  }

  public addSocialMedia() {
    let select = document.getElementById('selectSocialMedia') as HTMLSelectElement;
    var found = this.socialMediaList.find(e => e.name === select.value);

    if(found === undefined) {
   this.socialMediaList.push({
      name: select.value,
      link: ''
    });
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
    return this.wizardFormGroup.controls.p6;
  }
  
  get page7(): AbstractControl {
    return this.wizardFormGroup.controls.p7;
  }



  get headtitle(): AbstractControl {
    return this.wizardFormGroup.get('p1.headtitle');
  }

  get description(): AbstractControl {
    return this.wizardFormGroup.get('p1.description');
  }




  get country(): any {
    return this.wizardFormGroup.get('p5.country');
  }
  get city(): any {
    return this.wizardFormGroup.get('p5.city');
  }
  get address(): any {
    return this.wizardFormGroup.get('p5.address');
  }
  get postalCode(): any {
    return this.wizardFormGroup.get('p5.postalCode');
  }

  get followers(): any {
    return this.wizardFormGroup.get('p7.followers');
  }
  get pricePerPost(): any {
    return this.wizardFormGroup.get('p7.pricePerPost');
  }
  get pricePerStory(): any {
    return this.wizardFormGroup.get('p7.pricePerStory');
  }
  get pricePerHighlight(): any {
    return this.wizardFormGroup.get('p7.pricePerHighlight');
  }
  get ibanNumber(): any {
    return this.wizardFormGroup.get('p7.ibanNumber');
  }




}
