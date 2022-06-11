import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Offer, SocialMediaInformation } from 'src/app/shared/models/offers';
import { TranslocoService } from '@ngneat/transloco';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, take, tap } from 'rxjs/operators';
import { OffersService } from 'src/app/core/services/offers/offers.service';
import { of } from 'rxjs';


@Component({
  selector: 'app-brand-requested',
  templateUrl: './requested.component.html',
  styleUrls: ['./requested.component.scss']
})
export class BrandRequestedComponent implements OnInit {


  
  @Input()
  public offers: Offer[];
  

  


  @Output()
  refreshData: EventEmitter<any> = new EventEmitter();
  
  public newEvents: Offer[];


  public sortingFormGroup: FormGroup;

  constructor(private translocoService: TranslocoService, 
    private formBuilder: FormBuilder, 
    private offersService: OffersService) { 

      this.buildForm();

    }


  ngOnInit() {

  }

   ngOnChanges(changes: SimpleChanges) {
    this.filterAndSort();
  } 



  public partnership;
  showDetailModal = false;
  

  openDetailModal(partnership){
    console.log(partnership);
    this.partnership = partnership;
    this.showDetailModal = true;
  }


  closeDetailModal() {
    this.showDetailModal = false;
  }

  
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

    this.newEvents = this.offers;


/*     this.newEvents = this.offers.filter(event => {
      if (this.accepted.value && event.status === "REQUESTED") {
        return event;
      }
      if (this.pending.value && event.status === "Pending") {
        return event;
      }
      if (this.cancelled.value && event.status === "Cancelled") {
        return event;
      }
    });
 */



    this.newEvents?.sort((a, b) => {
      if (this.order.value === 'ascending') {
        return this.sort(a, b, 'ascending');

      } else if (this.order.value === 'descending') {
        return this.sort(a, b, 'descending');

      }

    });


  }


  private sort(a: Offer | any, b: Offer | any, order: 'ascending' | 'descending'): number {

    if (this.type.value === 'new') {
      a = a.id;
      b = b.id;

    } else if (this.type.value === 'time') {
      a = a.startDate;
      b = b.startDate;

    } else if (this.type.value === 'client') {
      a = a.brandId;
      b = b.brandId;

    } else if (this.type.value === 'status') {
      a = a.status;
      b = b.status;

    } else if (this.type.value === 'amount') {
      let amountA = 0;
      let amountB = 0;


      a.socialMediaDetails.forEach((element: SocialMediaInformation) => {
        amountA += element?.posts + element?.stories + element?.highlights;
      });

      b.socialMediaDetails.forEach((element: SocialMediaInformation) => {
        amountB += element?.posts + element?.stories + element?.highlights;
      });


      a = amountA;
      b = amountB;
    }

    if (b < a) return order === 'ascending' ? 1 : -1;
    if (b > a) return order === 'ascending' ? -1 : 1;
    return 0;

  }

}
