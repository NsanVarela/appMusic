import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { Album } from '../album';

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

  songs: string[];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    // console.log(this.album);
  }

  play(album: Album) {
    this.onPlay.emit(album);
    console.log('album enfant :', album);
    }


}
