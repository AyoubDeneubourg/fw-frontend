import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SocialMediaInformation } from 'src/app/shared/models/offers';

@Component({
  selector: 'app-social-media-details',
  templateUrl: './social-media-details.component.html',
  styleUrls: ['./social-media-details.component.scss']
})
export class SocialMediaDetailsComponent implements OnInit {


  @Output()
  addOrRemoveSocialMediaDetails: EventEmitter<any> = new EventEmitter();





  public collapsed: boolean = false;

  public changeCollapsed(): void {
    this.collapsed = !this.collapsed;
  }


  @Input()
  public socialMediaDetails: any;

  constructor() { }

  ngOnInit(): void {
  }

}
