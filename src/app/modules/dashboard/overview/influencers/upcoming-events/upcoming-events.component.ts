import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { take, tap } from 'rxjs/operators';
import { OffersService } from 'src/app/core/services/offers/offers.service';
import { Offer, SocialMediaInformation } from 'src/app/shared/models/offers';

@Component({
  selector: 'app-influencer-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class InfluencerUpcomingEventsComponent implements OnInit {
  
  

  @Input()
  public offers: Offer[];
  
  public newEvents: Offer[];
  
  public sortingFormGroup: FormGroup;

  @Output()
  refreshData: EventEmitter<any> = new EventEmitter();


  public partnership;
  showModal = false;
  showDetailModal = false;
  

  openDetailModal(partnership){
    this.partnership = partnership;
    this.showDetailModal = true;
  }

  openModal(partnership){
    this.partnership = partnership;
    this.showModal = true;
  }


  public acceptModal() {
   
    this.showModal = false;
    this.offerService.finishPartnership(this.partnership.id).pipe(
      take(1),
      tap((data) => {
        this.refreshData.emit();

      }
      )
    ).subscribe();


  }


  closeModal() {
    this.showModal = false;
  }

  closeDetailModal() {
    this.showDetailModal = false;
  }



  constructor(private formBuilder: FormBuilder, private offerService: OffersService) { }

  ngOnInit(): void {
    this.buildForm();

  }


  public filterAndSort() {

    
        this.newEvents = this.offers.filter(event => {
          if (this.inProgress.value && event.status === "IN_PROGRESS") {
            return event;
          }
          if (this.pending.value && event.status === "PENDING") {
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
            inProgress: new FormControl(true),
            pending: new FormControl(true),
    
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
    
    
      get inProgress(): any {
        return this.sortingFormGroup.get('status.inProgress');
      }
    
      get pending(): any {
        return this.sortingFormGroup.get('status.pending');
      }
      

    
      get order(): any {
        return this.sortingFormGroup.get('sortTypes.order');
      }
    
      get type(): any {
        return this.sortingFormGroup.get('sortTypes.type');
      }
    
    

}
