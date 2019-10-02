import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import * as firebase from 'firebase';

import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { AlbumDescriptionComponent } from './album-description/album-description.component';
import { ShufflePipe } from './shuffle.pipe';
import { StatComponent } from './stat/stat.component';
import { AvgPipe } from './avg.pipe';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AdminModule } from './admin/admin.module';
import { ShareModule } from './share/share.module';

const firebaseConfig = {
  apiKey: `AIzaSyDuWalIkcp74skzkd9NkbpAzze6bbfFJ28`,
  authDomain: `appmusic-77c24.firebaseapp.com`,
  databaseURL: `https://appmusic-77c24.firebaseio.com`,
  projectId: `appmusic-77c24`,
  storageBucket: `appmusic-77c24.appspot.com`,
  messagingSenderId: `68259435691`,
  appId: `1:68259435691:web:8e6c57f3403ba3bd77d3ee`,
  measurementId: `G-JSWKR51BP8`
};
// initialisez Firebase
firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    AlbumDetailsComponent,
    SearchComponent,
    LoginComponent,
    AlbumDescriptionComponent,
    ShufflePipe,
    StatComponent,
    AvgPipe,
    AudioPlayerComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AdminModule,
    ShareModule
  ],
  providers: [ShufflePipe, AvgPipe], // le pipe ici pour pouvoir l'utiliser comme un service
  bootstrap: [AppComponent] // composant principal
})
export class AppModule { }
