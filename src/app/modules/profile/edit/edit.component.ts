import { Component, OnInit } from '@angular/core';
import { COUNTRIES } from 'src/app/shared/data/countries';
import { LANGUAGES } from 'src/app/shared/data/languages';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditProfileComponent implements OnInit {

  public active: ActiveTab = 'Personal';

  public personalInformationEditMode: boolean = false;

  public languagesEditMode: boolean = false;

  public homeDetailsEditMode: boolean = false;



  public changeActiveTab(tab: ActiveTab) {
    this.active = tab;
  }


  public changeEditMode(editMode: 'personalInformationEditMode' | 'languagesEditMode' | 'homeDetailsEditMode') {
    this[editMode] = !this[editMode];
  }

  constructor() { }

  ngOnInit(): void {
  }


  public languageList = [];

  public availableLanguages = LANGUAGES;
  public availableCountries = COUNTRIES;

  public remove(item: string) {

    
    if(this.languageList.length === 1) {
      console.log("minimum 1")
    } else {
      this.languageList.splice(this.languageList.indexOf(item), 1);
    }
  }

  public add() {

    let select = document.getElementById('selectLanguages') as HTMLSelectElement;
    this.languageList.indexOf(select.value) === -1 && this.languageList.push(select.value);

  }
}

type ActiveTab = 'Personal' | 'PartnershipDetails';