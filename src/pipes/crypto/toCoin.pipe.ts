import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'toCoin', pure: false })
export class ToCoinPipe implements PipeTransform {


  transform (content: number) {
    return (content / 100000000).toFixed((8))
  }
}
