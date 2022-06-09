import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { LoginData } from 'src/app/shared/models/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  public loginFormGroup: FormGroup;
  public invalidCredentials: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {


    this.loginFormGroup = this.formBuilder.group({
      p1: this.formBuilder.group({
        email: ["", [Validators.required]],
        password: ["", [Validators.required]],
      }),
    })

  }


  public onSubmit(): void {

    this.invalidCredentials = false;


    if (this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched()

    } else {

      const LOGIN_DATA: LoginData = {
        username: this.email.value,
        password: this.password.value,
      }


      this.authService.login(LOGIN_DATA).pipe(
        take(1),
        tap((data) => {
          this.router.navigate(['/dashboard']);
        }),
        catchError(err => {
          console.log(err)
          this.invalidCredentials = true;
          return of(err)
        })).subscribe();

    }
  }



  get page1(): AbstractControl {
    return this.loginFormGroup.controls.p1;
  }


  get email(): AbstractControl {
    return this.loginFormGroup.get('p1.email');
  }

  get password(): AbstractControl {
    return this.loginFormGroup.get('p1.password');
  }


}
