import { Component, Input, OnInit } from '@angular/core';
import { Offer } from 'src/app/shared/models/offers';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  @Input() public events: Offer[];
  @Input() public newEvents: Offer[];


  constructor() { }

  ngOnInit(): void {
    this.events = [
      {
        orderId: 1,
        socialMedia: {
          facebook: {
            posts: 5,
            stories: 1,
            highlights: 0
          },
          twitter: {
            posts: 1,
            stories: 5,
            highlights: 1
          },
          youtube: {
            posts: 1,
            stories: 1,
            highlights: 5
          }
        },
        description: "string",
        dates: {
          startDate: "2020/02/25",
          endDate: "2020/02/30"
        },
        isAccepted: "Pending",
        files: "0"
      },
      {
        orderId: 1,
        socialMedia: {
          facebook: {
            posts: 7,
            stories: 1,
            highlights: 0
          },
          twitter: {
            posts: 1,
            stories: 7,
            highlights: 1
          },
          youtube: {
            posts: 1,
            stories: 1,
            highlights: 7
          }
        },
        description: "string",
        dates: {
          startDate: "2022/02/25",
          endDate: "2022/02/30"
        },
        isAccepted: "Accepted",
        files: "0"
      },
      {
        orderId: 1,
        socialMedia: {
          facebook: {
            posts: 6,
            stories: 1,
            highlights: 0
          },
          twitter: {
            posts: 1,
            stories: 6,
            highlights: 1
          },
          youtube: {
            posts: 1,
            stories: 1,
            highlights: 6
          }
        },
        description: "string",
        dates: {
          startDate: "2020/03/25",
          endDate: "2020/03/30"
        },
        isAccepted: "Candeled",
        files: "0"
      }
    ]
  }



  sort() {

    /*     this.events.sort((a, b) => {
          if (b.socialMedia.facebook.posts < a.socialMedia.facebook.posts) return 1;
          if (b.socialMedia.facebook.posts > a.socialMedia.facebook.posts) return -1;
          return 0;
        });
     */





    this.newEvents = this.events.filter(e => {
      return e.isAccepted === 'Accepted' || e.isAccepted === 'Candeled'

    });
  }

}
