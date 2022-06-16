import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService, Color } from 'src/app/core/services/auth-service/auth.service';
import { ProfileService } from 'src/app/core/services/profile/profile-service.service';
import { COUNTRIES } from 'src/app/shared/data/countries';
import { LANGUAGES } from 'src/app/shared/data/languages';
import { Profile, sectors } from 'src/app/shared/models/common';
import { SocialMediaArray } from 'src/app/shared/models/offers';

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


  public color: Color; 
  
  public allEditMode = ['personalInformationEditMode' , 'languagesEditMode' , 'sectorsEditMode' , 'countryEditMode' , 'homeDetailsEditMode' , 'socialMediaEditMode' , 'paymentInformationEditMode'];

  public changeActiveTab(tab: ActiveTab) {
    this.active = tab;
  }



  public changeEditMode(editMode: string) {
    this.allEditMode.forEach(element => {
      this[element] = false;
    });

    this[editMode] = !this[editMode];
  }

  constructor(private authService: AuthService, private profileService: ProfileService) { }

  ngOnInit(): void {


    this.color = this.authService.colors;

    const user = this.authService.loggedInUser;

    if(user.userType == "BRAND") {

      console.log(this.authService.loggedInBrand['user'], this.authService.loggedInBrand['brand'])
      
      this.profile = {...this.authService.loggedInBrand['user'], ...this.authService.loggedInBrand['brand']};
      this.type = 'BRAND';
      
    } else {
      
      console.log(this.authService.loggedInInfluencer['user'], this.authService.loggedInInfluencer['influencer'])
      this.profile = {...this.authService.loggedInInfluencer['user'], ...this.authService.loggedInInfluencer['influencer']};
      this.type = "INFLUENCER"
    }

    this.setLanguagesCountriesSectorsSocialMedia()
  }

  public setLanguagesCountriesSectorsSocialMedia() {


    this.profile.languages.forEach((element : any) => {
      this.languageList.push(element.language);
    });




    this.profile.sectors.forEach((element: any) => {
      this.sectorList.push(element.sector);
    });

    this.profile.countries.forEach((element: any) => {
      this.countryList.push(element.country);
    });


    this.profile.socialMedia.forEach((element: any) => {
      this.socialMediaList.push({
        name: element.name,
        link: element.link
      });
    });

  }
  public availableLanguages = LANGUAGES;
  public availableCountries = COUNTRIES;
  public availableSectors = sectors;
  public availableSocialMedias = SocialMediaArray;



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

  @ViewChild('country') country : ElementRef;
  @ViewChild('city') city : ElementRef;
  @ViewChild('address') address : ElementRef;
  @ViewChild('postalCode') postalCode : ElementRef;

  @ViewChild('followers') followers : ElementRef;
  @ViewChild('postPrice') postPrice : ElementRef;
  @ViewChild('storyPrice') storyPrice : ElementRef;
  @ViewChild('highlightPrice') highlightPrice : ElementRef;

  @ViewChild('ibanNumber') ibanNumber : ElementRef;

  public updateUser(section) {

    let PROFILE: any = {
      "user": {

        "address": this.profile.address,
        "city": this.profile.city,
        "postalCode": this.profile.postalCode,
        "country": this.profile.country,
    },
    };

    if(this.profile.userType == 'INFLUENCER') {


    PROFILE.influencer = {   
      "ibanNumber": this.profile.ibanNumber,
      "headTitle": this.profile.headTitle,
      "description": this.profile.description,
      "languages": this.profile.languages,
      "socialMedia": this.profile.socialMedia,
      "countries": this.profile.countries,
      "storyPrice": this.profile.storyPrice,
      "followers": this.profile.followers,
      "postPrice": this.profile.postPrice,
      "highlightPrice": this.profile.highlightPrice,
      "sectors": this.profile.sectors,
} 

} else {

  PROFILE.brand = {   
    "headTitle": this.profile.headTitle,
    "description": this.profile.description,
    "languages": this.profile.languages,
    "socialMedia": this.profile.socialMedia,
    "countries": this.profile.countries,
    "sectors": this.profile.sectors,


} 


}


switch(section) {
  case 'personalInformationEditMode': {
    if(this.profile.userType == 'INFLUENCER') {
      PROFILE.influencer.headTitle = this.headTitle.nativeElement.value;
      PROFILE.influencer.description = this.description.nativeElement.value;

    } else {
      PROFILE.brand.headTitle = this.headTitle.nativeElement.value;
      PROFILE.brand.description = this.description.nativeElement.value;
    }
    break;
  }
  case 'languagesEditMode':
    let languageList = this.languageList.map(elem => ({ language: elem, } ));
    if(this.profile.userType == 'INFLUENCER') PROFILE.influencer.languages = languageList;
    else PROFILE.brand.languages = languageList;
    break;

  case 'sectorsEditMode':
    let sectorList = this.sectorList.map(elem => ({ sector: elem, } ));
    if(this.profile.userType == 'INFLUENCER') PROFILE.influencer.sectors = sectorList;
    else PROFILE.brand.sectors = sectorList;
    break;

  case 'countryEditMode':
    let countryList = this.countryList.map(elem => ({ country: elem, } ));
    if(this.profile.userType == 'INFLUENCER') PROFILE.influencer.countries = countryList;
    else PROFILE.brand.countries = countryList;
    break;

  case 'homeDetailsEditMode':
    PROFILE = { ...PROFILE, ...{ "user": { "country": this.country.nativeElement.value, "city": this.city.nativeElement.value, "address": this.address.nativeElement.value, "postalCode": this.postalCode.nativeElement.value  } } };
    break;

  case 'socialMediaEditMode':
    
   let socialMediaList = [];

   

    this.socialMediaList.forEach((element: any) => {

      let x = document.getElementById('link-' + element.name) as HTMLSelectElement;
      socialMediaList.push({
        name: element.name.toUpperCase(),
        link: x.value
      });
    }); 

    if(this.profile.userType == 'INFLUENCER') {
      PROFILE.influencer.followers = this.followers.nativeElement.value;
      PROFILE.influencer.postPrice = this.postPrice.nativeElement.value;
      PROFILE.influencer.storyPrice = this.storyPrice.nativeElement.value;
      PROFILE.influencer.highlightPrice = this.highlightPrice.nativeElement.value;
      PROFILE.influencer.socialMedia = socialMediaList;
    } else {
      PROFILE.brand.socialMedia = socialMediaList;
    }

    break;

  case 'paymentInformationEditMode':
    PROFILE.influencer.ibanNumber = this.ibanNumber.nativeElement.value;
    break;


    break;



}

if(this.profile.userType == 'INFLUENCER') {
  this.profileService.updateInfluencerProfile(PROFILE, this.profile.id).subscribe(res => {
    location.href = '/profile/edit';

  });
} else {
  this.profileService.updateBrandProfile(PROFILE, this.profile.id).subscribe(res => {
    location.href = '/profile/edit';

  });
}



  }


}

type ActiveTab = 'Personal' | 'PartnershipDetails';
