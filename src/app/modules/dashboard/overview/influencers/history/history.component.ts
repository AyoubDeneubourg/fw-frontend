import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { OffersService } from 'src/app/core/services/offers/offers.service';
import { Offer, SocialMediaInformation } from 'src/app/shared/models/offers';


@Component({
  selector: 'app-influencer-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class InfluencerBrandHistoryComponent implements OnInit {

  @Input()
  public offers: Offer[];


  public newEvents: Offer[];



  public sortingFormGroup: FormGroup;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.buildForm();

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
