import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'fromCoin', pure: false })
export class FromCoinPipe implements PipeTransform {


  transform (content: number):number {
    return (content * 100000000)
  }
}
