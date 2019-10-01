import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {

  id: string = null;
  song: string = null;
  playing = false;
  current = 1;
  total: number = null;
  ratio = 0;

  constructor(private albumS: AlbumService) {
    this.albumS.statusPlayer.subscribe(status => {
      this.id = status.id;
      this.current = status.current;
      this.total = status.total;
      this.ratio = status.ratio;
    });
  }

  ngOnInit() { }

}
