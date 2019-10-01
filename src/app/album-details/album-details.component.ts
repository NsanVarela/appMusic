import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Album, List } from '../album';
import { AlbumService } from '../album.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '60px',
        opacity: 1,
        backgroundColor: 'yellow',
        padding: '1px'
      })),
      state('closed', style({
        height: '40px',
        opacity: 0.5,
        backgroundColor: 'green',
        padding: '1px'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class AlbumDetailsComponent implements OnInit, OnChanges {

  @Input() album: Album;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onPlay: EventEmitter<Album> = new EventEmitter();

  hideAlbum = true;
  songs: string[];
  isOpen = true;
  id: string = null;
  current: number = null;
  isActive = true;

  constructor( private albumS: AlbumService ) { // En premier, avant montage dans le dom'
    this.albumS.statusPlayer.subscribe( status => {
      this.id = status.id;
      this.current = status.current;
    });
  }

  ngOnInit() { // 2/ au montage du template dans le DOM et une fois
  }

  ngOnChanges() { // après montage dans le DOM et quand on passe une valeur parent/enfant @Input'
    if (this.album) {
      this.hideAlbum = false; // on rend visible l'album une fois que l'on a passé un album depuis le parent
      const list: List = this.albumS.getAlbumList(this.album.id);
      this.songs = list ? list.list : [];
    }
  }

  play(album: Album) {
    if (this.album) {
      this.albumS.switchOn(album);
      this.isActive = false;
    }
    this.onPlay.emit(album);
  }

  stop(album: Album) {
    this.isActive = true;
  }

  hide() {
    this.hideAlbum = true;
    this.albumS.initStatus();
  }

  shuffle() {
    if (this.songs) {
      this.songs = this.albumS.shuffle( this.songs );
      this.toggle();
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

}
