import { Component } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // animation triggers ...
    ]
})
export class AppComponent {
  title = `app-music`;
  count: Observable<number>;
  time;

  constructor() {
    const intervalNumber = interval(1000);

    const counter = intervalNumber.pipe(
      map(seconds => {
        const hours = Math.floor(seconds / 3600);
        const min = Math.floor(seconds / 60);
        return hours + ' h ' + (min - hours * 60) + ' min ' + (seconds - min * 60) + ' sec';
      })
    );

    counter.subscribe(
      num => {
        return this.time = num;
      }
    );
  }
}
