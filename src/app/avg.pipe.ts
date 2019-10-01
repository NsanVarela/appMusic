import { Pipe, PipeTransform } from '@angular/core';

// ng generate pipe avg

@Pipe({
  name: 'avg'
})
export class AvgPipe implements PipeTransform {

  transform(data: number[]): number {

    const count = data.length;
    // précision de 0.1 avec Math.floor
    if (count > 0) {
      return Math.floor( ( data.reduce((acc, current) => acc + current) / count ) * 10 ) / 10;
    }
  }

}
