import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthService, Color } from 'src/app/core/services/auth-service/auth.service';
import { OffersService } from 'src/app/core/services/offers/offers.service';
import { Profile, User } from 'src/app/shared/models/common';
import { Offer, SocialMediaArray, SocialMediaInformation } from 'src/app/shared/models/offers';
import { PageNavigation } from 'src/app/shared/models/pagination';
import { dateAfterNow } from 'src/app/shared/static/forms/date-after-now-validation';
import { dateBeforeDate } from 'src/app/shared/static/forms/date-before-date-validation';
import { minOneChecked } from 'src/app/shared/static/forms/min-one-true-validation';
import { isNotNullOrUndefined } from 'src/app/shared/static/utils/is-null-or-undefined';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})

export class OffersComponent implements OnInit {

  public offerFormGroup: FormGroup;
  public actualPage: number = 1;
  public allowToGo: number = 1;


  public noFileUploaded: boolean = false;

  public socialMediaArray = SocialMediaArray;

  public socialMediaDetailsValid: boolean = true;

  public socialMediaDetails: SocialMediaInformation[] = [];


  public influencerId: number;

  public influencerProfile: Profile;

  public allPages: PageNavigation[] = [
    {
      title: 'offers.socialMedia',
      currentStatus: 'Active',
    },
    {
      title: 'offers.amounts',
      currentStatus: 'Future',
    },
    {
      title: 'offers.dates',
      currentStatus: 'Future',
    },
    {
      title: 'offers.description',
      currentStatus: 'Future',
    },
    {
      title: 'offers.upload',
      currentStatus: 'Future',
    },
    {
      title: 'offers.confirm',
      currentStatus: 'Future',
    }
  ];

  public color: Color;

  constructor(private formBuilder: FormBuilder, 
    private offerService: OffersService, 
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    
    private authService: AuthService) { }

  ngOnInit(): void {

    this.color = this.authService.colors;
    this.influencerId = this.route.snapshot.params.id;

     this.authService.loggedInUser$.subscribe(data => {
      console.log(data);
      if(data.userType == 'INFLUENCER') {
        console.log('Influencers are not authorized to send offers.')

        this.router.navigateByUrl('/dashboard');

      }
    });

    this.buildForm();


    console.log(this.influencerId);
    this.authService.getInfluencer(this.influencerId).pipe(
      tap(data => {
        console.table(data);
      this.influencerProfile = {...data.user, ...data.influencer};

      console.log(this.influencerProfile);
      if(!this.influencerProfile.socialMedia?.length || (!this.influencerProfile.postPrice && !this.influencerProfile.highlightPrice && !this.influencerProfile.storyPrice)) {
        console.log('This influencer has no social media or no prices.')
        this.router.navigateByUrl('/dashboard');
      }
    }), catchError(err => {
      this.router.navigateByUrl('/dashboard');
      return of(err);
    })).subscribe();






  }

  
  
  public returnBack() {

    this.location.back();


  }



  public buildForm() {
    

    this.offerFormGroup = this.formBuilder.group({

      p1: this.formBuilder.group({
        socialMedia: new FormArray([
          new FormControl(false),
          new FormControl(false),
          new FormControl(false),
          new FormControl(false),
          new FormControl(false),
          new FormControl(false),
          new FormControl(false)
        ], minOneChecked()),
      }),


      p2: this.formBuilder.group({
      }),


      p3: this.formBuilder.group({
/*         startDate: ['2022-05-29', [Validators.required]],
        endDate: ['2022-05-29', [Validators.required]], */
        startDate: ['', [Validators.required, dateAfterNow()]],
        endDate: ['', [Validators.required, dateBeforeDate("startDate")]], 
      }),


      p4: this.formBuilder.group({
        description: ['', [Validators.required]],
      }),

      p5: this.formBuilder.group({
      }),

      p6: this.formBuilder.group({
      }),
    });


    this.startDate.valueChanges.subscribe(() => {
      this.endDate.updateValueAndValidity();
    });
  }


  public goToPage(page: number): void {

    if (page === 1) {
      this.setCurrentPages(1);
    }



    if (page === 2) {
      if (this.page1.valid) {
        this.setCurrentPages(2);
        this.setSocialMedia();
      } else {

        this.goToPage(1);
        this.offerFormGroup.controls[Object.keys(this.offerFormGroup.controls)[this.actualPage - 1]].markAllAsTouched();
      }
    }



    if (page === 3) {
      if (this.page1.valid && this.checkSocialMediaDetailsValid()) {

        this.checkSocialMediaDetailsValid();
        this.setCurrentPages(3);



      } else {

        this.goToPage(2);
        this.offerFormGroup.controls[Object.keys(this.offerFormGroup.controls)[this.actualPage - 1]].markAllAsTouched();
      }
    }


    if (page === 4) {
      if (this.page1.valid && this.checkSocialMediaDetailsValid() && this.page3.valid) {

        this.setCurrentPages(4);

      } else {

        this.goToPage(3);
        this.offerFormGroup.controls[Object.keys(this.offerFormGroup.controls)[this.actualPage - 1]].markAllAsTouched();
      }
    }

    if (page === 5) {
      if (this.page1.valid && this.checkSocialMediaDetailsValid() && this.page3.valid && this.page4.valid ) {
        this.setCurrentPages(5);

      } else {

        this.goToPage(4);
        this.offerFormGroup.controls[Object.keys(this.offerFormGroup.controls)[this.actualPage - 1]].markAllAsTouched();
      }
    }


    if (page === 6) {
      console.log(this.formData.getAll('file'));

      if (this.page1.valid && this.checkSocialMediaDetailsValid() && this.page3.valid && this.page4.valid && this.page5.valid && this.formData.getAll('file').length) {
        this.setCurrentPages(6);

      } else {

        this.goToPage(5);
        this.noFileUploaded = true;
        this.offerFormGroup.controls[Object.keys(this.offerFormGroup.controls)[this.actualPage - 1]].markAllAsTouched();
      }
    }

  }



  setCurrentPages(newPage: number): void {
    if (this.actualPage !== newPage) {
      this.allPages[newPage - 1].currentStatus = 'Active';


      if (this.offerFormGroup.controls[Object.keys(this.offerFormGroup.controls)[this.actualPage - 1]].valid) {
        this.allPages[this.actualPage - 1].currentStatus = 'Valid';
      } else {
        this.allPages[this.actualPage - 1].currentStatus = 'Future';
      }
    }
    this.actualPage = newPage;

  }



  onSubmit(): void {

    let user: User = this.authService.loggedInUser;


    const OFFER = {
      influencerId: this.influencerId, 
      brandId: user.id,
      socialMediaDetails: this.socialMediaDetails,
      description: this.description.value,
      startDate: this.startDate.value,
      endDate: this.endDate.value,
      file: "this.formData",
    };


    if (this.offerFormGroup.invalid) {

      this.offerFormGroup.markAllAsTouched()

    } else {


      this.offerService.createOffer(OFFER).subscribe(
        (response: any) => {
          console.log(response);

          this.offerService.postFile(this.formData, response).subscribe(
            (response: any) => {
              console.log(response);

            }
          );


         this.router.navigate(['/dashboard']);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );

    }

  }



  public setSocialMedia() {

    const tempSocialMediaDetails = this.socialMediaDetails;

    this.socialMediaDetails = [];

    this.socialMedia.controls.forEach((control, controlIndex) => {
      if(control.value) {

        const tempSocialMedia = tempSocialMediaDetails.find(element => element.name == this.socialMediaArray[controlIndex]);

         if(tempSocialMedia) {
            this.socialMediaDetails.push(tempSocialMedia);

         } else {

          this.socialMediaDetails.push({
            name: this.socialMediaArray[controlIndex],
            posts: 0,
            highlights: 0,
            stories: 0,
            highlightPrice: this.influencerProfile.highlightPrice,
            storyPrice: this.influencerProfile.storyPrice,
            postPrice: this.influencerProfile.postPrice
          });
         }
      }
    });

  }


  public checkSocialMediaDetailsValid(): boolean {

    this.socialMediaDetailsValid = true;

    for (const socialMedia in this.socialMediaDetails) {
      if (!this.socialMediaDetails[socialMedia].posts
        && !this.socialMediaDetails[socialMedia].stories
        && !this.socialMediaDetails[socialMedia].highlights) {
        this.socialMediaDetailsValid = false;
      }
    }

    return this.socialMediaDetailsValid;

  }


  public addOrRemoveSocialMediaDetails(data: { socialMedia: string, type: 'posts' | 'stories' | 'highlights', action: '+' | '-' }): void {


    if (data.action === '+') this.socialMediaDetails.find(element => element.name == data.socialMedia)[data.type]++
    if (data.action === '-' && this.socialMediaDetails.find(element => element.name == data.socialMedia)?.[data.type] !== 0) this.socialMediaDetails.find(element => element.name == data.socialMedia)[data.type]--
  }

  /*   public addOrRemoveStories(data: { socialMedia: string, action: '+' | '-' }): void {
  
      if (data.action === '+') this.socialMediaDetails[data.socialMedia].stories++
      if (data.action === '-' && this.socialMediaDetails[data.socialMedia]?.stories !== 0) this.socialMediaDetails[data.socialMedia].stories--
    }
  
    public addOrRemoveHighlights(data: { socialMedia: string, action: '+' | '-' }): void {
  
      if (data.action === '+') this.socialMediaDetails[data.socialMedia].highlights++
      if (data.action === '-' && this.socialMediaDetails[data.socialMedia]?.highlights !== 0) this.socialMediaDetails[data.socialMedia].highlights--
    }
   */

    public fileList: FileList;
    public formData: FormData = new FormData();


    fileChange(event) {
      this.fileList = event.target.files;
  
  
  
      if(this.fileList.length > 0) {

          let file: File = this.fileList[0];

          this.formData.append('file', file, file.name);
  
      }
  }

  get page1(): AbstractControl {
    return this.offerFormGroup.controls.p1;
  }

  get page2(): AbstractControl {
    return this.offerFormGroup.controls.p2;
  }

  get page3(): AbstractControl {
    return this.offerFormGroup.controls.p3;
  }

  get page4(): AbstractControl {
    return this.offerFormGroup.controls.p4;
  }

  get page5(): AbstractControl {
    return this.offerFormGroup.controls.p5;
  }

  get page6(): AbstractControl {
    return this.offerFormGroup.controls.p6;
  }



  get socialMedia(): any {
    return this.offerFormGroup.get('p1.socialMedia');
  }


  get startDate(): any {
    return this.offerFormGroup.get('p3.startDate');
  }

  get endDate(): any {
    return this.offerFormGroup.get('p3.endDate');
  }

  get description(): any {
    return this.offerFormGroup.get('p4.description');
  }


  get uploadFile(): any {
    return this.offerFormGroup.get('p5.uploadFile');
  }

}

// Indexed Acces

/* export type Collection = {
  items: {
    books: string,
    movies: string,
  }[],
  total: number;
} */