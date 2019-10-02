import { Pipe, PipeTransform } from '@angular/core';

// ng generate pipe avg

@Pipe({
  name: 'avg'
})
export class AvgPipe implements PipeTransform {

  transform(notes: number[]): number {
    if ( notes ) {
      const count = notes.length;
      // précision de 0.1 avec Math.floor
      if (count > 0) {
        return Math.floor( ( notes.reduce((acc, current) => acc + current) / count ) * 10 ) / 10;
      }
      return null;
    }
  }

}
