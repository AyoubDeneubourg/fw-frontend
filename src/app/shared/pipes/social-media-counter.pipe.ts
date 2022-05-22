import { Pipe, PipeTransform } from '@angular/core';
import { SocialMediaInformation } from '../models/offers';

@Pipe({
  name: 'socialMediaCounter'
})
export class SocialMediaCounterPipe implements PipeTransform {

  transform(value: SocialMediaInformation[], type: 'posts' | 'highlights' | 'stories'): unknown {

    let val = 0;

    value.forEach(element => {
      val += element[type];
    });

    return val;
  }
}
