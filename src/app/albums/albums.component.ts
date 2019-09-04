import { Component, OnInit } from '@angular/core';
import { Album } from '../album'; // def du type
import { ALBUMS } from '../mock-albums'; // données d'exemple
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  // One way property binding
  titlePage = `Page principale Albums Music`;
  albums: Album[] = ALBUMS;
  selectedAlbum: Album;
  title: string;
  albumId: string;

  constructor(private albumS: AlbumService) {

    // tester ici les méthodes demandées
    this.albumId = `2`;
    this.albumS.getAlbums();
    console.log(this.albumS.getAlbums());
    this.albumS.getAlbum(this.albumId);
    console.log(this.albumS.getAlbum(this.albumId));
    this.albumS.getAlbumList(this.albumId);
    console.log(this.albumS.getAlbumList(this.albumId));
  }

  ngOnInit() {
  }

  onSelect(album: Album) {
    this.selectedAlbum = { ...album};
  }

  playParent($event: Album) {
    this.albums = ALBUMS.map(album => {
      if (album.id === $event.id) {
        album.status = 'on';
        return album;
      } else {
        album.status = 'off';
        return album;
      }
    });
  }



}
