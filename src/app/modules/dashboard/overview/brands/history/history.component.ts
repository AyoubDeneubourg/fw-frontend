import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Offer, SocialMediaInformation } from 'src/app/shared/models/offers';
import { TranslocoService } from '@ngneat/transloco';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { take, tap } from 'rxjs/operators';
import { OffersService } from 'src/app/core/services/offers/offers.service';
import { Rate, RatingService } from 'src/app/core/services/profile/rating-service.service';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';

@Component({
  selector: 'app-brand-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class BrandHistoryComponent implements OnInit {

  
  @Input()
  public offers: Offer[];
  

  @Output()
  refreshData: EventEmitter<any> = new EventEmitter();
  
  
  public newEvents: Offer[];


  public sortingFormGroup: FormGroup;

  constructor(private translocoService: TranslocoService, 
    private formBuilder: FormBuilder, 
    private offersService: OffersService,
    private authService: AuthService,
    private rateService: RatingService) { 

      this.buildForm();

    }

    public authedUser;

  ngOnInit() {

    this.authedUser = this.authService.loggedInUser;

    this.getBrandRatings();    
  }

  public getBrandRatings() {
    this.rateService.getBrandRating(this.authedUser.id).pipe(
      take(1),
      tap((data) => {

        
        this.offers.forEach((offer, index) => {
          this.offers[index]['toRate'] = true;
          data.forEach(data => {

            if(offer.id === data.partnershipId){
              this.offers[index]['toRate'] = false;
            } else {
              //this.offers[index]['toRate'] = true;
            }
          });
          
        });
    
      
      }
      )).subscribe();

  }
   ngOnChanges(changes: SimpleChanges) {


    this.filterAndSort();
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


  public rate;
  showRateModal = false;
  

  openRateModal(rate){
    this.rate = rate;
    this.showRateModal = true;
  }


  closeRateModal() {
    this.showRateModal = false;
  }




  acceptRateModal() {

 
    let amount = document.getElementById('rateAmount') as HTMLInputElement;
    let description = document.getElementById('rateDescription') as HTMLInputElement;

    if(!amount.checkValidity() || !description.checkValidity()){
      amount.reportValidity();
      description.reportValidity();

    } else {
      
      this.showRateModal = false;
      
      let rate: Rate = {
      influencerId: this.rate.influencerId,
      brandId: this.rate.brandId,
      partnershipId: this.rate.id,
      amount: parseInt(amount.value) as 1 | 2 | 3 | 4 | 5,
      description: description.value
    }
    this.rateService.postRating(rate).pipe(
      take(1),
      tap((data) => {

        amount.value = "";
        description.value = "";
   
        this.offers.forEach((offer, index) => {
          if(offer.id === rate.partnershipId){
            this.offers[index]['toRate'] = false;
          }
      
      }

        )}
      )).subscribe();
  }


}



  public partnership;
  showDetailModal = false;
  

  openDetailModal(partnership){
    this.partnership = partnership;
    this.showDetailModal = true;
  }


  closeDetailModal() {
    this.showDetailModal = false;
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
