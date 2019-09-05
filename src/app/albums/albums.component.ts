import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../album'; // def du type
import { ALBUMS } from '../mock-albums'; // données d'exemple
import { AlbumService } from '../album.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  // One way property binding
  private albumPerPage: number = environment.albumPerPage;
  titlePage = `Page principale Albums Music`;
  albums: Album[] = ALBUMS;
  selectedAlbum: Album;
  title: string;
  albumId: string;
  searchAlbum: Album[];
  isSearch = false;
  page: any;


  constructor(private route: ActivatedRoute , private albumS: AlbumService) {

    // tester ici les méthodes demandées
    this.albumId = `2`;

    this.albumS.getAlbums();
    // console.log(`Tous les albums`, this.albumS.getAlbums());
    this.albumS.getAlbum(this.albumId);
    // console.log(`Album par Id`, this.albumS.getAlbum(this.albumId));
    this.albumS.getAlbumList(this.albumId);
    // console.log(`Liste de l'album par Id`, this.albumS.getAlbumList(this.albumId));
    this.albumS.count();
    // console.log(`nbre d'albums`, this.albumS.count());
    this.albumS.paginate(1, 3);
    // console.log(`pagination 0 à 3`, this.albumS.paginate(0, 3));

  }

  ngOnInit() {
  }

  onSelect(album: Album) {
    this.selectedAlbum = { ...album};
    const id = this.selectedAlbum.id;
    const albumList = this.albumS.getAlbumList(id);
    console.log('albumList', albumList);
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

  searchParent($event: Album[]) {
    this.albums = $event;
    this.isSearch = true;
  }

  // reload propre à ce component
  reload() {
    this.albums = this.albumS.paginate(0, this.albumPerPage);
    this.isSearch = false;
  }

  // reload déclenché à partir d'un événement de l'enfant
  relaodParent($event: boolean) {
    this.isSearch = false;
    // remettre tous les albums
    this.albums = this.albumS.paginate(0, this.albumPerPage);
  }

  paginateParent($event: { start: number, end: number }) {
    // affectation de variable en mode spread
    const { start, end } = $event;
    this.albums = this.albumS.paginate(start, end);
  }

}
