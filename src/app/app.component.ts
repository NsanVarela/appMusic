import { Component } from '@angular/core';
import { HorlogeService } from './horloge.service';
import { AlbumService } from './album.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // animation triggers ...
    ]
})
export class AppComponent {
  title = 'AppMusic';
  // tslint:disable-next-line: no-inferrable-types
  navbarOpen: boolean = false;
  hour: number = null;
  minute: number = null;
  second: number = null;
  isConnected: boolean = false;

  constructor(private horloge: HorlogeService, private albumS: AlbumService, private authS: AuthService) {

    this.albumS.getAlbums().subscribe( albums => console.log(albums));

    this.horloge.getHorloge().subscribe(time => {
      const { hour, minute, second } = time;

      this.hour = hour;
      this.minute = minute;
      this.second = second;

      this.isConnected = this.authS.isConnected();
    });
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    this.authS.logout();
  }

}
