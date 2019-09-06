import { Injectable } from '@angular/core';

import { ALBUMS, ALBUM_LISTS } from './mock-albums';
import { Album, List } from './album';
import { ShufflePipe } from './shuffle.pipe';

import { Subject } from 'rxjs';

// type de la fonction d'ordre permet de créer un type function
type Order = (a: Album, b: Album) => number;
@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private albums: Album[] = ALBUMS;
  private albumLists = ALBUM_LISTS;
  private notes: Array<number>;

  // subject pour la pagination informer les autres components
  sendCurrentNumberPage = new Subject<number>();

  // factoriser l'ordre pour le service
  defaultOrder: Order = (a, b) => a.duration - b.duration;

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

  paginate(start: number, end: number, order: Order = this.defaultOrder): Album[] {

    return this.albums.sort(order).slice(start, end);
  }

  search(word: string): Album[] {
    return this.albums.filter(album => album.title.includes(word) );
  }

  shuffle(data: any[]) {
    return this.shuffleData.transform(data);
  }

  currentPage(page: number) {
    return this.sendCurrentNumberPage.next(page);
  }

}
