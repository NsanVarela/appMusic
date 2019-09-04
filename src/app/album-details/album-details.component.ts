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

  constructor(private albumS: AlbumService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    // console.log(this.album);
    if (this.album) {
      this.hideAlbum = false;
    }
  }

  play(album: Album) {
    this.onPlay.emit(album);
    // console.log('album enfant :', album);
  }

  hide() { this.hideAlbum = true; this.albumS.initStatus(); }

}
