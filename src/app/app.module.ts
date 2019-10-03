import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
// import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import * as firebase from 'firebase';
import { environment } from '../environments/environment';

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

// initialisez Firebase
firebase.initializeApp(environment.firebase);


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
    // FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AdminModule,
    ShareModule
  ],
  providers: [ShufflePipe, AvgPipe], // le pipe ici pour pouvoir l'utiliser comme un service
  bootstrap: [AppComponent] // composant principal
})
export class AppModule { }
