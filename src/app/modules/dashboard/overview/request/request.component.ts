import { Component, Input, OnInit } from '@angular/core';
import { Offer } from 'src/app/shared/models/offers';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TranslocoService } from '@ngneat/transloco';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {


  public sortingFormGroup: FormGroup;

  constructor(private translocoService: TranslocoService, private formBuilder: FormBuilder) { }


  ngOnInit() {

    this.buildForm();

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
          startDate: "2025/02/25",
          endDate: "2020/02/30"
        },
        isAccepted: "Pending",
        files: "0"
      },
      {
        orderId: 2,
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
          startDate: "1999/02/25",
          endDate: "2022/02/30"
        },
        isAccepted: "Accepted",
        files: "0"
      },
      {
        orderId: 5,
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
        isAccepted: "Cancelled",
        files: "0"
      }
    ];

  }
  onItemSelect(item: any) {
    console.log(item);

  }
  onSelectAll(items: any) {
    console.log(items);
  }

  @Input() public events: Offer[];
  @Input() public newEvents: Offer[];


  public buildForm() {


    this.sortingFormGroup = this.formBuilder.group({
      status: this.formBuilder.group({
        accepted: new FormControl(true),
        pending: new FormControl(true),
        cancelled: new FormControl(true),

      }),
      sortTypes: this.formBuilder.group({
        type: ['new', [Validators.required]],
        order: ["ascending", [Validators.required]],
      }),
    })


  }

  get status(): AbstractControl {
    return this.sortingFormGroup.controls.status;
  }


  get accepted(): any {
    return this.sortingFormGroup.get('status.accepted');
  }

  get pending(): any {
    return this.sortingFormGroup.get('status.pending');
  }
  
  get cancelled(): any {
    return this.sortingFormGroup.get('status.cancelled');
  }

  get order(): any {
    return this.sortingFormGroup.get('sortTypes.order');
  }

  get type(): any {
    return this.sortingFormGroup.get('sortTypes.type');
  }





  public filterAndSort() {


    this.newEvents = this.events.filter(event => {
      if (this.accepted.value && event.isAccepted === "Accepted") {
        return event;
      }
      if (this.pending.value && event.isAccepted === "Pending") {
        return event;
      }
      if (this.cancelled.value && event.isAccepted === "Cancelled") {
        return event;
      }
    });




    this.newEvents.sort((a, b) => {
      if (this.order.value === 'ascending') {
        return this.sort(a, b, 'ascending');

      } else if (this.order.value === 'descending') {
        return this.sort(a, b, 'descending');

      }

    });


  }


  private sort(a: Offer | any, b: Offer | any, order: 'ascending' | 'descending'): number {


    if (this.type.value === 'new') {
      a = a.orderId;
      b = b.orderId;

    } else if (this.type.value === 'time') {
      a = a.dates.startDate;
      b = b.dates.startDate;

    } else if (this.type.value === 'client') {
      a = a.description;
      b = b.description;

    } else if (this.type.value === 'amount') {
      let amountA = 0;
      let amountB = 0;


      for (const [key, socialMedia] of Object.entries(a.socialMedia)) {
        for (const [key, entries] of Object.entries(socialMedia)) {
          amountA += entries;
        }
      }

      for (const [key, socialMedia] of Object.entries(b.socialMedia)) {
        for (const [key, entries] of Object.entries(socialMedia)) {
          amountB += entries;
        }
      }

      a = amountA;
      b = amountB;
    }

    if (b < a) return order === 'ascending' ? 1 : -1;
    if (b > a) return order === 'ascending' ? -1 : 1;
    return 0;


  }
}
