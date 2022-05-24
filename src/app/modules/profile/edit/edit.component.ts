import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditProfileComponent implements OnInit {

  public active: ActiveTab = 'Personal';
  public editMode: boolean = false;


  public changeActiveTab(tab: ActiveTab) {
    this.active = tab;
  }


  public changeEditMode() {
    this.editMode = !this.editMode;
  }

  constructor() { }

  ngOnInit(): void {
  }

}

type ActiveTab = 'Personal' | 'PartnershipDetails';