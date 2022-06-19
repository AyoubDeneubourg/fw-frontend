import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Color } from 'src/app/core/services/auth-service/auth.service';

@Component({
  selector: 'app-social-media-details',
  templateUrl: './social-media-details.component.html',
  styleUrls: ['./social-media-details.component.scss']
})
export class SocialMediaDetailsComponent implements OnInit {


  @Output()
  addOrRemoveSocialMediaDetails: EventEmitter<any> = new EventEmitter();

  @Input()
  postPrice: number = 0;

  @Input()
  storyPrice: number = 0;

  @Input()
  highlightPrice: number = 0;

  
  @Input()
  color: Color;

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
