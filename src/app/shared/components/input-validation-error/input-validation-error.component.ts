import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { isNullOrUndefined } from '../../static/utils/is-null-or-undefined';


@Component({
  selector: 'app-input-validation-error',
  templateUrl: './input-validation-error.component.html',
  styleUrls: ['./input-validation-error.component.scss'],
})
export class InputValidationErrorComponent implements OnInit {


  @Input()
  public control: AbstractControl;


  constructor() {
  }

  get getInputErrors(): InputError[] {
    if (this.control.invalid && this.control.errors) {
      return Object.keys(this.control.errors).map(key => {
        this.readableParams(this.control.errors[key]);
        return {
          key, parameters: this.control.errors[key]
        };

      });
    } else {
      return [];
    }
  }

  public ngOnInit(): void {

  }

  private readableParams(error: any) {
    for (const key of Object.keys(error)) {
      const value = error[key];
      if (value instanceof Array) {
        if (value.length > 1) {
          error[key] = value.slice(0, -1).join(', ') + value.slice(-1);
        }
      }
    }
  }
}

interface InputError {
  key: string;
  parameters?: any;
}


