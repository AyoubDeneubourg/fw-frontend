import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firebaseTimeToNormalDate'
})
export class FirebaseTimeToNormalDatePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    
    const date = new Date(value?.seconds * 1000);
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  }

}
