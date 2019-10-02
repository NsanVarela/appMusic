import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/album.service';
import { Observable } from 'rxjs';
import { Album } from 'src/app/album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  albums: Observable<Album[]>;
  perPage = 4;

  constructor(private albumS: AlbumService) {
    this.albums = this.albumS.getAlbums();
  }

  ngOnInit() {
    this.albums = this.albumS.paginate(0, this.perPage);
  }

  paginateParent($event: { start: number, end: number }) {
    const { start, end } = $event;
    this.albums = this.albumS.paginate(start, end, (a, b) => b.duration - a.duration);
  }

}
