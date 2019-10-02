import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {

  current = 1;
  total: number = null;
  ratio = 0;
  albumId: string;

  isPlaying: boolean = false;

  constructor(private albumS: AlbumService) {
    this.albumS.statusPlayer.subscribe(status => {
      this.current = status.current;
      this.total = status.total;
      this.ratio = status.ratio;

      this.albumId = status.albumId;
    });

    this.albumS.buttonPlay.subscribe(
      status => this.isPlaying = status
    )
  }

  ngOnInit() { }

}
