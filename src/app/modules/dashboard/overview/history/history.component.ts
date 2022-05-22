import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { OffersService } from 'src/app/core/services/offers/offers.service';
import { Offer } from 'src/app/shared/models/offers';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  @Input()
  public offers: Offer[];


  public newEvents: Offer[];



  public sortingFormGroup: FormGroup;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    console.log(this.offers)
    this.buildForm();

  }


  public filterAndSort() {

    

        this.newEvents = this.offers.filter(event => {
          if (this.declined.value && event.status === "DECLINED") {
            return event;
          }
          if (this.done.value && event.status === "DONE") {
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






      public buildForm() {


        this.sortingFormGroup = this.formBuilder.group({
          status: this.formBuilder.group({
            done: new FormControl(true),
            declined: new FormControl(true),
    
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
    
    
      get done(): any {
        return this.sortingFormGroup.get('status.done');
      }
    
      get declined(): any {
        return this.sortingFormGroup.get('status.declined');
      }
      

    
      get order(): any {
        return this.sortingFormGroup.get('sortTypes.order');
      }
    
      get type(): any {
        return this.sortingFormGroup.get('sortTypes.type');
      }
    
    
}
