import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Time } from './album';

@Injectable({
  providedIn: 'root'
})
export class HorlogeService {

  constructor() { }

  getHorloge(): Observable<Time> {
    return interval(1000).pipe(
      map(time => {
        const hour = Math.floor(time / 3600);
        const minute = Math.floor(time / 60) - hour * 60;
        const second = time - (minute * 60 + hour * 3600);
        return { hour, minute, second };
      })
    );
  }

}
