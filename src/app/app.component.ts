import { Component, OnInit } from '@angular/core';
import { HorlogeService } from './horloge.service';
import { AlbumService } from './album.service';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // animation triggers ...
    ]
})
export class AppComponent implements OnInit {
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

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isConnected = true;
        } else {
          this.isConnected = false;
        }
      }
    );
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    this.authS.logout();
  }


}
