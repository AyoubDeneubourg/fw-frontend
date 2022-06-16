import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService, Color } from 'src/app/core/services/auth-service/auth.service';
import { RegistrationData } from 'src/app/shared/models/common';
import { PageNavigation } from 'src/app/shared/models/pagination';
import { catchError, take, tap } from 'rxjs/operators'
import { COUNTRIES } from 'src/app/shared/data/countries';
import { matchValues } from 'src/app/shared/static/forms/password-validation';
import { birthDate } from 'src/app/shared/static/forms/birthdate-validation';
import { of } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public countries = COUNTRIES;

  public registerFormGroup: FormGroup;
  public actualPage: number = 1;
  public allowToGo: number = 1;

  public color: Color;

  public emailAlreadyExists: boolean = false;
  public usernameAlreadyExists: boolean = false;

  public allPages: PageNavigation[] = [
    {
      title: 'register.accountType',
      currentStatus: 'Active',
    },
    {
      title: 'register.country',
      currentStatus: 'Future',
    },
    {
      title: 'register.address',
      currentStatus: 'Future',
    },
    {
      title: 'register.details',
      currentStatus: 'Future',
    },
    {
      title: 'register.password',
      currentStatus: 'Future',
    },
    {
      title: 'register.phoneNumber',
      currentStatus: 'Future',
    }
  ];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {


    this.registerFormGroup = this.formBuilder.group({
      p1: this.formBuilder.group({
        accountType: ["", [Validators.required]],
      }),

      p2: this.formBuilder.group({
        country: ['BE', [Validators.required]],
      }),



      p3: this.formBuilder.group({
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        postalCode: ['', [Validators.required,]],
      }),


      p4: this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        userName: ['', [Validators.required,]],
        email: ['', [Validators.required, Validators.email]],
        birthDate: ['', [Validators.required, birthDate()]],

      }),
      p5: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPassword: ['', [Validators.required, matchValues('password')]],
      }),

      p6: this.formBuilder.group({
        phoneNumber: ['', [Validators.required]],
      }),

    });

    this.password.valueChanges.subscribe(() => {
      this.repeatPassword.updateValueAndValidity();
    });

  }



  goToPage(page: number): void {

    if (page === 1) {
      this.setCurrentPages(1);
    }



    if (page === 2) {
      if (this.page1.valid) {
        this.setCurrentPages(2);
      } else {

        this.goToPage(1);
        this.registerFormGroup.controls[Object.keys(this.registerFormGroup.controls)[this.actualPage - 1]].markAllAsTouched();
      }
    }



    if (page === 3) {
      if (this.page1.valid && this.page2.valid) {




        this.setCurrentPages(3);



      } else {

        this.goToPage(2);
        this.registerFormGroup.controls[`p${this.actualPage}`].markAllAsTouched();
      }
    }


    if (page === 4) {
      if (this.page1.valid && this.page2.valid && this.page3.valid) {

        this.setCurrentPages(4);
   
      } else {

        this.goToPage(3);
        this.registerFormGroup.controls[`p${this.actualPage}`].markAllAsTouched();
      }
    }

    if (page === 5) {
      if (this.page1.valid && this.page2.valid && this.page3.valid && this.page4.valid) {
        this.emailAlreadyExists = false;
        this.usernameAlreadyExists = false;

        this.authService.checkCredentialsAvailability({ email: this.email.value, userName: this.userName.value, })
        .pipe(
          tap(data => {
            if(data) this.setCurrentPages(5);
            }
          ),
          catchError((err) => {
            if(err.error.message == "email") {
              this.emailAlreadyExists = true;
              
            } if(err.error.message == "username") { 
              this.usernameAlreadyExists = true;

            } if(err.error.message == "both") { 
              this.emailAlreadyExists = true;
              this.usernameAlreadyExists = true;
            }
     
            return of(null);
          }
          )
        )
        .subscribe();
        

      } else {

        this.goToPage(4);
        this.registerFormGroup.controls[`p${this.actualPage}`].markAllAsTouched();
      }
    }

    if (page === 6) {
      if (this.page1.valid && this.page2.valid && this.page3.valid && this.page4.valid && this.page5.valid) {

        this.setCurrentPages(6);
   
      } else {

        this.goToPage(5);
        this.registerFormGroup.controls[`p${this.actualPage}`].markAllAsTouched();
      }
    }


  }



  setCurrentPages(newPage: number): void {
    if (this.actualPage !== newPage) {
      this.allPages[newPage - 1].currentStatus = 'Active';


      //  if (this.registerFormGroup.controls[`p${this.actualPage}`].valid) {
      if (this.registerFormGroup.controls[Object.keys(this.registerFormGroup.controls)[this.actualPage - 1]].valid) {
        this.allPages[this.actualPage - 1].currentStatus = 'Valid';
      } else {
        this.allPages[this.actualPage - 1].currentStatus = 'Future';
      }
    }

    this.actualPage = newPage;

  }


  public selectType(type: "BRAND" | "INFLUENCER"): void {

    this.accountType.setValue(type);
    type == "INFLUENCER" ? this.color = "blue" : this.color = "orange";
    this.goToPage(2)

  }

  public clickedRegister: boolean = false;

  onSubmit(): void {

    if (this.registerFormGroup.invalid) {

      // this.goToPage(5)
      this.registerFormGroup.markAllAsTouched()

    } else {


      if(!this.clickedRegister) {

      const REGISTRATIONDATA: RegistrationData = {
        userType: this.accountType.value,
        country: this.country.value,
        firstName: this.firstName.value,
        userName: this.userName.value,
        address: this.address.value,
        city: this.city.value,
        postalCode: parseInt(this.postalCode.value),
        lastName: this.lastName.value,
        email: this.email.value,
        birthdate: this.birthDate.value,
        password: this.password.value,
        phoneNumber: this.phoneNumber.value
      }

      this.clickedRegister = true;

      this.authService.register(REGISTRATIONDATA)
      .pipe(
        take(1),
        tap(data => {

          this.authService.login(
            {
              username: this.userName.value,
              password: this.password.value
            }
          ).subscribe((response) => {
            this.router.navigate(['/dashboard']);
          })

        }),
        catchError(err => {
          this.clickedRegister = false;
          return of(err);
        })).subscribe();

     

    }

  }


  }


  get page1(): AbstractControl {
    return this.registerFormGroup.controls.p1;
  }

  get page2(): AbstractControl {
    return this.registerFormGroup.controls.p2;
  }

  get page3(): AbstractControl {
    return this.registerFormGroup.controls.p3;
  }
  get page4(): AbstractControl {
    return this.registerFormGroup.controls.p4;
  }

  get page5(): AbstractControl {
    return this.registerFormGroup.controls.p5;
  }

  get page6(): AbstractControl {
    return this.registerFormGroup.controls.p6;
  }




  get accountType(): AbstractControl {
    return this.registerFormGroup.get('p1.accountType');
  }

  get country(): AbstractControl {
    return this.registerFormGroup.get('p2.country');
  }

  get address(): AbstractControl {
    return this.registerFormGroup.get('p3.address');
  }

  get city(): AbstractControl {
    return this.registerFormGroup.get('p3.city');
  }

  get postalCode(): AbstractControl {
    return this.registerFormGroup.get('p3.postalCode');
  }


  get firstName(): AbstractControl {
    return this.registerFormGroup.get('p4.firstName');
  }

  get lastName(): AbstractControl {
    return this.registerFormGroup.get('p4.lastName');
  }

  get userName(): AbstractControl {
    return this.registerFormGroup.get('p4.userName');
  }

  get email(): AbstractControl {
    return this.registerFormGroup.get('p4.email');
  }

  get birthDate(): AbstractControl {
    return this.registerFormGroup.get('p4.birthDate');
  }

  get password(): AbstractControl {
    return this.registerFormGroup.get('p5.password');
  }

  get repeatPassword(): AbstractControl {
    return this.registerFormGroup.get('p5.repeatPassword');
  }

  get phoneNumber(): AbstractControl {
    return this.registerFormGroup.get('p6.phoneNumber');
  }

}



/*
  get workingCode() {
 
    
    this.b[number - 1].isCurrent = true;
    this.b[number - 1].isFuture = false;
    this.b[number - 1].isValid = false;
    this.b[this.page - 1].isCurrent = false;
 
 
    if (this.page !== number) {
      if (this.registerFormGroup.controls[`p${this.page}`].valid) {
        this.b[this.page - 1].isValid = true;
 
      } else {
 
        this.b[this.page - 1].isFuture = true;
      }
    }
 
 
  } */
