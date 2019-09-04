import { Injectable } from '@angular/core';
import { ALBUMS, ALBUM_LISTS } from './mock-albums';
import { Album, List } from './album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  albums: Album[] = ALBUMS;
  albumLists = ALBUM_LISTS;

  constructor() { }

  getAlbums(): Album[] { return this.albums; }

  getAlbum(id: string): Album {
    return this.albums.find(album => album.id === id);
  }

  getAlbumList(id: string): List {
    return this.albumLists.find(list => list.id === id);
  }

  initStatus(): void {
    this.albums = this.albums.map(album => { album.status = `off` ; return album ; });
  }
}
