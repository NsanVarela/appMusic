import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { Album, List } from '../album';
import { AlbumService } from '../album.service';
import { ALBUM_LISTS } from '../mock-albums';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit, OnChanges {

  @Input() album: Album;
  @Input() title: string;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onPlay: EventEmitter<Album> = new EventEmitter();

  albumLists: List[] = ALBUM_LISTS;
  songs: Array<string> = [];
  hideAlbum = true;
  selectedAlbum: Album;

  constructor(private albumS: AlbumService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    // console.log('après montage dans le DOM et quand on passe une valeur parent/enfant @Input');
    // console.log(this.album); // Au montage cette valeur est null

    // le fait d'envoyer une nouvelle copie à chaque fois permet de réafficher l'album
    // nottamment celui sur lequel on vient de cliqué
    if (this.album) {
      this.hideAlbum = false; // on rend visible l'album une fois que l'on a passé un album depuis le parent

      const list: List = this.albumS.getAlbumList(this.album.id);
      this.songs = list ? list.list : [];
    }
  }

  play(album: Album) {
    this.onPlay.emit(album);
    // console.log('album enfant :', album);
  }

  hide() { this.hideAlbum = true; this.albumS.initStatus(); }

  shuffle() {
    if (this.songs) {
      this.songs = this.albumS.shuffle(this.songs);
    }
  }

}
