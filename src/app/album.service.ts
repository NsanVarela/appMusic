import { Injectable } from '@angular/core';
import { ALBUMS, ALBUM_LISTS } from './mock-albums';
import { Album, List } from './album';
import { ShufflePipe } from './shuffle.pipe';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  albums: Album[] = ALBUMS;
  albumLists = ALBUM_LISTS;

  constructor(private shuffleData: ShufflePipe) { }

  getAlbums(order = (a, b) => b.duration - a.duration): Album[] {
    return this.albums.sort(
      (a, b) => b.duration - a.duration
    );
  }

  getAlbum(id: string): Album {
    return this.albums.find(album => album.id === id);
  }

  getAlbumList(id: string): List {
    return this.albumLists.find(list => list.id === id);
  }

  initStatus(): void {
    this.albums = this.albums.map(album => { album.status = `off` ; return album ; });
  }

  count() {
    return this.albums.length;
  }

  paginate(start: number, end: number): Album[] {
    return this.albums.slice(start, end);
  }

  search(word: string): Album[] {
    return this.albums.filter(album => album.title.includes(word) );
  }

  shuffle(data: any[]) {
    return this.shuffleData.transform(data);
  }

}
