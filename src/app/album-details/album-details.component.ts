import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { ShufflePipe } from '../shuffle.pipe';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Album, List } from '../album';
import { AlbumService } from '../album.service';
import { ALBUM_LISTS } from '../mock-albums';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss'],
  animations: [
    trigger('openClose', [
      // définir l'état open de l'élément HTML
      state('open', style({
        height: '40px',
        opacity: 1,
        backgroundColor: '#FA8072'
        })),
      // définir l'état close de l'élément HTML
      state('close', style({
        height: '100px',
        opacity: 0.25,
        backgroundColor: '#000000'
        })),
      transition('open <=> closed', [
        animate('0.3s')
      ])
    ]),
  ],
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

  isOpen = false;

  constructor(private albumS: AlbumService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
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
      this.isOpen = !this.isOpen;
    }
  }


}
