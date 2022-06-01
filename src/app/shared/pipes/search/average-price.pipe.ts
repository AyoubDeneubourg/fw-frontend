import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'averagePrice'
})
export class AveragePricePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {

    let arr = [value.highlightPrice, value.storyPrice, value.postPrice];

    var max_of_array = Math.max.apply(Math, arr);
    var min_of_array = Math.min.apply(Math, arr);
    return min_of_array == max_of_array ? "€" + min_of_array : "€" + min_of_array + " - €" + max_of_array;
  }

}
