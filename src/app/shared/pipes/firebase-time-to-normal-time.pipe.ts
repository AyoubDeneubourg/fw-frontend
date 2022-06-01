import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp }  from "@angular/fire/firestore";


@Pipe({
  name: 'firebaseTimeToNormalTime'
})
export class FirebaseTimeToNormalTimePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {


    if(value?.seconds) {

      const date = new Date(value?.seconds * 1000);
      return date.getHours() + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());

    } else {

      return "00:00"
    }
  }

}
