import { Injectable } from '@angular/core';

import { Album, List } from './album';
import { ALBUMS, ALBUM_LISTS } from './mock-albums';
import { ShufflePipe } from './shuffle.pipe';

import { Subject } from 'rxjs';
import { AvgPipe } from './avg.pipe';

// type de la fonction d'ordre permet de créer un type function
type Order = (a: Album, b: Album) => number;

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  albums: Album[] = ALBUMS;
  albumLists = ALBUM_LISTS;

  sendCurrentNumberPage: Subject<number> = new Subject() ;
  subjectAlbum = new Subject<Album>();
  statusPlayer = new Subject<{ id: string, current: number, total: number, ratio: number }>();

  defaultOrder: Order = (a: Album, b: Album) => a.duration - b.duration; // factorise l'ordre pour le service

  constructor( private shuffleData: ShufflePipe, private avgPipe: AvgPipe) {
    // pipe qui permet de calculer la moyenne dans le service
  }

  currentPage(page: number) {
    // permet de signifier d'envoyer le numéro de la page aux observables : renvoi un Observable
    return this.sendCurrentNumberPage.next(page);
  }

  initSubject() {
    // réinitialisation de notre sujet
    if
    (this.sendCurrentNumberPage.closed) {
      this.sendCurrentNumberPage = new Subject();
    }
  }

  getAlbums(order: Order = this.defaultOrder): Album[] {
    return this.albums.sort(order);
  }

  getAlbum(id: string): Album {
    return this.albums.find(album => album.id === id);
  }

  getAlbumList(id: string): List {

    return this.albumLists.find(list => list.id === id);
  }

  initStatus(): void {
    this.albums = this.albums.map(
      album => {
        album.status = `off`;
        return album;
      }
    );
  }

  change(id: string, title: string) {
    // cette méthode est utile pour vous montrez dans le composant AlbumDetailsComponent que le service est partagé
    // Regardez dans le typescript de ce composant AlbumDetailsComponent méthode hide et constatez que cela change
    this.albums = this.albums.map(
      album => {
        if (album.id === id) {
          album.title = title;
        }

        return album;
      }
    )
  }

  count(): number {
    return this.albums.length;
  }

  paginate(start: number, end: number, order: Order = this.defaultOrder): Album[] {
    // l'ordre se fait de manière globale on fait d'abord le sort puis on fait le slice
    return this.albums.sort(order).slice(start, end);
  }

  specialOrderPaginate(start: number, end: number, order: Order = this.defaultOrder): Album[] {
    return this.albums.slice(start, end).sort(order);
  }

  search(word: string): Album[] {
    return this.albums.filter(album => album.title.includes(word));
  }

  shuffle(data: any[]) {
    // là on souhaite utiliser le pipe dans notre service
    // On va donc chercher la méthode transform du pipe que l'on applique
    // à nos données
    return this.shuffleData.transform(data);
  }

  avg(data: number[]) {
    // On utilise la moyenne qui vient du pipe que l'on injecte dans le service
    return this.avgPipe.transform(data) ;
  }

  switchOn(album: Album) {
    album.status = `on`;
    this.playList(album);
  }

  switchOff(album: Album) {
    album.status = `off`;
  }

  playList(album: Album) {
    const id: string = album.id;
    // const song: string = ;
    // const playing: boolean = false;
    let total = Math.floor(album.duration / 120);
    let current = 0;
    let ratio = Math.floor(current * (100 / total));

    this.statusPlayer.next({
      id, current, ratio, total
    });

    const interval = setInterval(() => {
      if (current < total) {
        current++;
        ratio = Math.floor(current * (100 / total));
      } else {
        total = null;
        ratio = 0;
        current = null;
        album.status = 'off';
        clearInterval(interval);
      }

      this.statusPlayer.next({ id, current, ratio, total });
    }, 1000);
  }

}
