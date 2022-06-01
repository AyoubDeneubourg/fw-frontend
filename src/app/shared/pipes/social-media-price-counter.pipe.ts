import { Pipe, PipeTransform } from '@angular/core';
import { SocialMediaInformation } from '../models/offers';

@Pipe({
  name: 'socialMediaPriceCounter'
})
export class SocialMediaPriceCounterPipe implements PipeTransform {

  transform(value: SocialMediaInformation[], type: 'total'): unknown {

    let val = 0;
    value.forEach(element => {
      
      val += (element.storyPrice * element.stories);
      val += (element.postPrice * element.posts);
      val += (element.highlightPrice * element.highlights);
    });

    return val;
  }

}
