import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { LoginData } from 'src/app/shared/models/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  public loginFormGroup: FormGroup;


  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {


    this.loginFormGroup = this.formBuilder.group({
      p1: this.formBuilder.group({
        email: ["", [Validators.required]],
        password: ["", [Validators.required]],
      }),
    })

  }


  public onSubmit(): void {


    if (this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched()

    } else {

      const LOGINDATA: LoginData = {
        email: this.email.value,
        password: this.password.value,
      }


      this.authService.login(LOGINDATA)
        .subscribe((response) => {
          console.log(response);
        });

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
