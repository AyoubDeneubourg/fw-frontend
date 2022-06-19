import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toTwoNumbersAfterComma'
})
export class toTwoNumbersAfterCommaPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {

    if(value == 0 || value == 5 || value == 4 || value == 3 || value == 2 || value == 1) {
      return value
    } else {
      return value?.toFixed(2);
    }

  }

}
