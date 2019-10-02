import { Component, OnInit } from '@angular/core';

import { Album } from '../album'; // def du type
import { ALBUMS } from '../mock-albums'; // données d'exemple
import { AlbumService } from '../album.service';
import { Observable } from 'rxjs';

@Component({
  selector: `app-albums`,
  templateUrl: `./albums.component.html`,
  styleUrls: [`./albums.component.scss`]
})
export class AlbumsComponent implements OnInit {
  // one Way property binding
  // tslint:disable-next-line: no-inferrable-types
  titlePage: string = `Page princpale Albums Music`;
  albums: Observable<Album[]> ; // on utilise ici async pour souscrire directement dans le template
  selectedAlbum: Album;
  // tslint:disable-next-line: no-inferrable-types
  isSearch: boolean = false;
  // tslint:disable-next-line: no-inferrable-types
  perPage: number = 3;
  // tslint:disable-next-line: no-inferrable-types
  countAlbums: number = 0;

  constructor(private albumS: AlbumService) {
    // testez ici les méthodes demandées
    // console.log(this.albumS.getAlbums());
    // console.log(this.albumS.getAlbum("1"));
    // const al = this.albumS.getAlbum("1");
    // console.log(this.albumS.getAlbumList(al.id));
    // let list = this.albumS.getAlbumList("14151");
    // console.log(list ? list.list : null);

    // on fait le subscribe directement dans le template
    this.albums = this.albumS.paginate(0, this.perPage , (a, b) => b.duration - a.duration);
  }

  // cycle de vie d'un component une fois que le component est monté dans le DOM
  ngOnInit() {
    // this.albums = this.albumS.getAlbums((a, b) => b.duration - a.duration);
    this.albums = this.albumS.paginate(0, this.perPage , (a, b) => b.duration - a.duration);
  }

  onSelect(album: Album) {
    // On crée un nouvel objet par rapport à l'objet album initial que l'on passe dans le select
    this.selectedAlbum = { ...album };
  }

  playParent($event: Album) {

    // this.albums = ALBUMS.map(album => {
    //   if (album.id == $event.id) { album.status = 'on'; return album; }
    //   else { album.status = 'off'; return album; }
    // });

    this.albumS.switchOn($event).subscribe(
      (album) => {
        console.log('put', album);
      }
    );
  }

  searchParent($event: Observable<Album[]>) {
    this.albums = $event;
    this.isSearch = true;
  }

  // reload propre à ce component
  reload() {
    this.albums = this.albumS.paginate(0, this.perPage);
    this.isSearch = false;
  }

  // reload déclenché à partir d'un événement de l'enfant
  relaodParent($event: boolean) {
    this.isSearch = false; // propre à ce component bouton rouge c'est autre chose (...)

    // remettre tous les albums
    this.albums = this.albumS.paginate(0, this.perPage);
  }

  paginateParent($event: { start: number, end: number }) {
    // affectation de variable en mode spread
    const { start, end } = $event;

    this.albums = this.albumS.paginate(start, end, (a, b) => b.duration - a.duration);
  }

}
