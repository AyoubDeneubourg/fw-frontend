import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { ProfileService } from 'src/app/core/services/profile/profile-service.service';
import { COUNTRIES } from 'src/app/shared/data/countries';
import { LANGUAGES } from 'src/app/shared/data/languages';
import { Profile, sectors } from 'src/app/shared/models/common';
import { SocialMediaArray, SocialMediaArrayCapitalized } from 'src/app/shared/models/offers';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditProfileComponent implements OnInit {

  public active: ActiveTab = 'Personal';

  public personalInformationEditMode: boolean = false;

  public languagesEditMode: boolean = false;
  public sectorsEditMode: boolean = false;
  public socialMediaEditMode: boolean = false;
  public countryEditMode: boolean = false;

  public homeDetailsEditMode: boolean = false;
  public paymentInformationEditMode: boolean = false;

  public profile: Profile;
  public type: "BRAND" | "INFLUENCER";



  public changeActiveTab(tab: ActiveTab) {
    this.active = tab;
  }


  public changeEditMode(editMode: 'personalInformationEditMode' | 'languagesEditMode' | 'homeDetailsEditMode' | 'sectorsEditMode' | 'socialMediaEditMode' | 'countryEditMode' | 'paymentInformationEditMode') {
    this[editMode] = !this[editMode];
  }

  constructor(private authService: AuthService, private profileService: ProfileService) { }

  ngOnInit(): void {

    const user = this.authService.loggedInUser;

    if(user.userType == "BRAND") {

      this.profile = {...this.authService.loggedInBrand['user'], ...this.authService.loggedInBrand['brand']};
      this.type = 'BRAND';

    } else {

      this.profile = {...this.authService.loggedInInfluencer['user'], ...this.authService.loggedInInfluencer['influencer']};
      this.type = "INFLUENCER"
    }

  }

  public availableLanguages = LANGUAGES;
  public availableCountries = COUNTRIES;
  public availableSectors = sectors;
  public availableSocialMedias = SocialMediaArrayCapitalized;



  public languageList = [];


  public removeLanguage(item: string) {
    if(this.languageList.length === 1) {
      console.log("minimum 1")
    } else {
      this.languageList.splice(this.languageList.indexOf(item), 1);
    }
  }

  public addLanguage() {
    let select = document.getElementById('selectLanguages') as HTMLSelectElement;
    this.languageList.indexOf(select.value) === -1 && this.languageList.push(select.value);
  }







  public sectorList = [];

  public removeSector(item: string) {
    if(this.sectorList.length === 1) {
      console.log("minimum 1")
    } else {
      this.sectorList.splice(this.sectorList.indexOf(item), 1);
    }
  }

  public addSector() {
    let select = document.getElementById('selectSectors') as HTMLSelectElement;
    this.sectorList.indexOf(select.value) === -1 && this.sectorList.push(select.value);
  }




  public socialMediaList = [];


  public removeSocialMedia(item: string) {
    if(this.socialMediaList.length === 1) {
      console.log("minimum 1")
    } else {
      this.socialMediaList.splice(this.socialMediaList.indexOf(item), 1);
    }
  }

  public addSocialMedia() {
    let select = document.getElementById('selectSocialMedia') as HTMLSelectElement;
    this.socialMediaList.indexOf(select.value) === -1 && this.socialMediaList.push(select.value);
  }


  public countryList = [];


  public removeCountry(item: string) {
    if(this.countryList.length === 1) {
      console.log("minimum 1")
    } else {
      this.countryList.splice(this.countryList.indexOf(item), 1);
    }
  }

  public addCountry() {
    let select = document.getElementById('selectCountries') as HTMLSelectElement;
    this.countryList.indexOf(select.value) === -1 && this.countryList.push(select.value);
  }


  @ViewChild('headtitle') headTitle : ElementRef;
  @ViewChild('description') description : ElementRef;

  public updateUser(section) {


    let PROFILE: any = {    
      "user": {
     // "firstName":this.profile.firstName,
     // "lastName": this.profile.lastName,
     // "userName": this.profile.userName,
      "address": this.profile.address,
      "city": this.profile.city,
      "postalCode": this.profile.postalCode,
      "country": this.profile.country,
  },

  "influencer": {
      "ibanNumber": this.profile.ibanNumber,
      "headTitle": this.profile.headTitle,
      "description": this.profile.description,
      "languages": this.profile.languages,
      "socialMedia": this.profile.socialMedia,
      "countries": this.profile.countries,
      "storyPrice": this.profile.storyPrice,
      "postPrice": this.profile.postPrice,
      "highlightPrice": this.profile.highlightPrice,
}
}


switch(section) {
  case 'personalInformationEditMode': {
    PROFILE = { ...PROFILE, ...{ "influencer": { "headTitle": this.headTitle.nativeElement.value, "description": this.description.nativeElement.value  } } };
    break;
  }
  case 'languagesEditMode':
    let x = this.languageList.map(item => { language : item});
    console.log(x);
    PROFILE = { ...PROFILE, ...{ "influencer": { "languages": this.languageList } } };
    break;
  case 'homeDetailsEditMode':
    PROFILE = { ...{}}
    break;
  case 'sectorsEditMode':
    PROFILE = { ...{}}
    break;
  case 'socialMediaEditMode':
    PROFILE = { ...{}}
    break;
  case 'countryEditMode':
    PROFILE = { ...{}}
    break;
  case 'paymentInformationEditMode':
    PROFILE = { ...{}}
    break;

  default:
    PROFILE = { ...{}}
    break;





}
console.log(PROFILE);
console.log(this.profile.userId, this.profile.id)
    this.profileService.updateInfluencerProfile(PROFILE, this.profile.id).subscribe(res => {
      console.log(res);
    });

  }


}

type ActiveTab = 'Personal' | 'PartnershipDetails';