import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SocialMedia, SocialMediaInformation } from 'src/app/shared/models/offers';

@Component({
  selector: 'app-social-media-details',
  templateUrl: './social-media-details.component.html',
  styleUrls: ['./social-media-details.component.scss']
})
export class SocialMediaDetailsComponent implements OnInit {


  @Output()
  addOrRemoveSocialMediaDetails: EventEmitter<any> = new EventEmitter();


  @Input()
  public socialMedia: string;


  public collapsed: boolean = false;

  public changeCollapsed(): void {
    this.collapsed = !this.collapsed;
  }


  @Input()
  public socialMediaDetails: SocialMedia;

  constructor() { }

  ngOnInit(): void {
  }

}
