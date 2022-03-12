import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { RegistrationData } from 'src/app/shared/models/common';
import { PageNavigation } from 'src/app/shared/models/pagination';
import { tap } from 'rxjs/operators'
import { COUNTRIES } from 'src/app/shared/data/countries';
import { matchValues } from 'src/app/shared/static/forms/password-validation';
import { zip } from 'rxjs';


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

  public allPages: PageNavigation[] = [
    {
      title: 'Account type',
      currentStatus: 'Active',
    },
    {
      title: 'Country',
      currentStatus: 'Future',
    },
    {
      title: 'Details',
      currentStatus: 'Future',
    },
    {
      title: 'Password',
      currentStatus: 'Future',
    },
    {
      title: 'Phone number',
      currentStatus: 'Future',
    }
  ];

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {


    this.registerFormGroup = this.formBuilder.group({
      p1: this.formBuilder.group({
        accountType: ["", [Validators.required]],
      }),

      p2: this.formBuilder.group({
        country: ['BE', [Validators.required]],
      }),

      p3: this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required]],
      }),

      p4: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPassword: ['', [Validators.required, matchValues('password')]],
      }),

      p5: this.formBuilder.group({
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
        this.setCurrentPages(5);

      } else {

        this.goToPage(4);
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


  public selectType(type: "Brand" | "Influencer"): void {

    this.accountType.setValue(type);
    this.goToPage(2);

  }


  onSubmit(): void {


    if (this.registerFormGroup.invalid) {

      this.goToPage(5)
      this.registerFormGroup.markAllAsTouched()

    } else {

      const REGISTRATIONDATA: RegistrationData = {
        accountType: this.accountType.value,
        country: this.country.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        password: this.password.value,
        phoneNumber: this.phoneNumber.value
      }


      this.authService.register(REGISTRATIONDATA)
        .subscribe((response) => {
          console.log(response);
        });

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




  get accountType(): AbstractControl {
    return this.registerFormGroup.get('p1.accountType');
  }

  get country(): AbstractControl {
    return this.registerFormGroup.get('p2.country');
  }

  get firstName(): AbstractControl {
    return this.registerFormGroup.get('p3.firstName');
  }

  get lastName(): AbstractControl {
    return this.registerFormGroup.get('p3.lastName');
  }

  get email(): AbstractControl {
    return this.registerFormGroup.get('p3.email');
  }

  get password(): AbstractControl {
    return this.registerFormGroup.get('p4.password');
  }

  get repeatPassword(): AbstractControl {
    return this.registerFormGroup.get('p4.repeatPassword');
  }

  get phoneNumber(): AbstractControl {
    return this.registerFormGroup.get('p5.phoneNumber');
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
