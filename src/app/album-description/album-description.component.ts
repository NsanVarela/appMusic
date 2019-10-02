import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { Album } from '../album';

@Component({
  selector: 'app-album-description',
  templateUrl: './album-description.component.html',
  styleUrls: ['./album-description.component.scss']
})
export class AlbumDescriptionComponent implements OnInit {

  album: Album;

  constructor(
    private route: ActivatedRoute,
    private albumS: AlbumService) {

    // on peut forcer le typage en lui imposant que l'on souhaite avoir un string
    const id = this.route.snapshot.paramMap.get('id') as string;

    this.albumS.getAlbum(id).subscribe(
      album => { this.album = album;  }
    );
  }

  ngOnInit() {

  }
}
