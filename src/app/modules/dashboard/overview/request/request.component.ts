import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Offer } from 'src/app/shared/models/offers';
import { TranslocoService } from '@ngneat/transloco';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, take, tap } from 'rxjs/operators';
import { OffersService } from 'src/app/core/services/offers/offers.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {


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

  public acceptPartnership(id: number) {



    this.offersService.acceptPartnership(id).pipe(
      take(1),
      tap((data) => {
        this.refreshData.emit();

      }),
      catchError(err => {
        console.log(err)
        return of(err)
      })).subscribe();




  }


  public declinePartnership(id: number) {
    
    this.offersService.declinePartnership(id).pipe(
      take(1),
      tap((data) => {
        this.refreshData.emit();

        console.log(data);
      }),
      catchError(err => {
        console.log(err)
        return of(err)
      })).subscribe();


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

    console.log(this.newEvents)
    console.log(this.offers)

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


    console.log(this.order)
    console.log(this.order.value)

    this.newEvents?.sort((a, b) => {
      if (this.order.value === 'ascending') {
        return this.sort(a, b, 'ascending');

      } else if (this.order.value === 'descending') {
        return this.sort(a, b, 'descending');

      }

    });

    console.log(this.newEvents)

  }


  private sort(a: Offer | any, b: Offer | any, order: 'ascending' | 'descending'): number {

    console.log(this.type.value)

    if (this.type.value === 'new') {
      a = a.id;
      b = b.id;

    } else if (this.type.value === 'time') {
      a = a.startDate;
      b = b.startDate;

    } else if (this.type.value === 'client') {
      a = a.brandId;
      b = b.brandId;

    } else if (this.type.value === 'amount') {
      let amountA = 0;
      let amountB = 0;

      console.log(a.socialMediaDetails);


      for (const [key, socialMedia] of Object.entries(a.socialMediaDetails)) {
        for (const [key, entries] of Object.entries(socialMedia)) {
          amountA += entries;
        }
      }

      for (const [key, socialMedia] of Object.entries(b.socialMediaDetails)) {
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
