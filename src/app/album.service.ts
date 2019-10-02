import { Injectable } from '@angular/core';

import { Album, List, StatusPlayer } from './album';
import { ALBUMS, ALBUM_LISTS } from './mock-albums';
import { ShufflePipe } from './shuffle.pipe';

import { Subject, Observable, interval, throwError } from 'rxjs';
import { AvgPipe } from './avg.pipe';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, take, takeUntil, catchError } from 'rxjs/operators';
import { AlbumsComponent } from './albums/albums.component';

// type de la fonction d'ordre permet de créer un type function
type Order = (a: Album, b: Album) => number;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  albums: Album[] = ALBUMS;
  albumLists = ALBUM_LISTS;

  private albumsUrl = `https://appmusic-77c24.firebaseio.com/albums`;
  private albumListsUrl = `https://appmusic-77c24.firebaseio.com/albumLists`;
  private albumCount = `https://appmusic-77c24.firebaseio.com/count`;

  sendCurrentNumberPage: Subject<number> = new Subject();
  subjectAlbum = new Subject<Album>();
  statusPlayer = new Subject<StatusPlayer>();
  buttonPlay = new Subject<boolean>();

  defaultOrder: Order = (a: Album, b: Album) => a.duration - b.duration; // factorise l'ordre pour le service

  private errorHandler = (error) => {
    if (error.erro instanceof ErrorEvent) {
      console.error(error.error.message);
    } else {
      console.error(error.status);
    }
    return throwError;
  }

  constructor( private shuffleData: ShufflePipe, private avgPipe: AvgPipe, private http: HttpClient ) {
    // pipe qui permet de calculer la moyenne dans le service
  }

  currentPage(page: number) {
    // permet de signifier d'envoyer le numéro de la page aux observables : renvoi un Observable
    return this.sendCurrentNumberPage.next(page);
  }

  initSubject() {
    // réinitialisation de notre sujet
    if (this.sendCurrentNumberPage.closed) {
      this.sendCurrentNumberPage = new Subject();
    }
  }

  getAlbums(order: Order = this.defaultOrder): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(
      map(albums => {
        return this.albums.sort(order);
      })
    );
  }

  getAlbum(id: string): Observable<Album> {
    return this.http.get<Album>(this.albumsUrl + `/${id}/.json`, httpOptions).pipe(
      catchError(this.errorHandler) // pour l'API qui retournerait des exceptions
    );
  }

  getAlbumList(id: string): Observable<Array<string>> {
    return this.http.get<List>(this.albumListsUrl + `/${id}/.json`, httpOptions).pipe(
      catchError(this.errorHandler),
      map(albumList => {
        const list: List = albumList;
        return list ? list.list : null;
      })
    );
  }

  getAlbumListNumber(id: string): Observable<number> {
    return this.http.get<List>(this.albumListsUrl + `/${id}/.json`, httpOptions).pipe(
      catchError(this.errorHandler),
      map(albumList => {
        const list: List = albumList;
        return list ? list.list.length : 0;
      })
    );
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
    );
  }

  count(): Observable<number> {
    return this.http.get<number>(this.albumCount + '/.json');
  }

  paginate(start: number, end: number, order: Order = this.defaultOrder): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(
      map(albums => {
        // l'ordre se fait de manière globale on fait d'abord le sort puis on fait le slice
        return albums.sort(order).slice(start, end);
      }),
    );
  }

  specialOrderPaginate(start: number, end: number, order: Order = this.defaultOrder): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(
      map(albums => {
        // l'ordre se fait de manière globale on fait d'abord le sort puis on fait le slice
        return albums.slice(start, end).sort(order);
      }),
    );
  }

  search(word: string, order: Order = this.defaultOrder): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(
      map(albums => {
        const Albums = [];
        albums.forEach(album => {
          if (album.title.includes(word)) {
            Albums.push(album);
          }
        });
        return Albums;
      }),
      map(albums => {
        return albums.sort(order);
      })
    );
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

  switchOn(album: Album): Observable<Album> {
    this.buttonPlay.next(true);
    album.status = `on`;
    // uri de l'album + l'objet album => update dans firebase
    return this.http.put<Album>(
      `${this.albumsUrl}/${album.id}/.json`, album, httpOptions
    );
  }

  switchOff(album: Album): Observable<Album> {
    this.buttonPlay.next(false);
    album.status = `off`;
    return this.http.put<Album>(
      `${this.albumsUrl}/${album.id}/.json`, album, httpOptions
    );
  }

  playList(album: Album, stop: boolean = false) {
    // let interval = null;

    // if (stop === false) {
    //   let total = Math.floor(album.duration / 120);
    //   let current = 1;
    //   let ratio = Math.floor(current * (100 / total));
    //   let playing = true;
    //   const songs = this.getAlbumList(album.id).list || [];
    //   let song = songs[current - 1];

    //   this.statusPlayer.next({
    //     albumId: album.id,
    //     playing,
    //     song,
    //     current,
    //     ratio,
    //     total
    //   });

    //   const progress = () => {
    //     console.log(`ici`);
    //     if (current < total) {
    //       current++;
    //       ratio = Math.floor(current * (100 / total));
    //       song = songs[current - 1];
    //     } else {
    //       total = null;
    //       ratio = 0;
    //       current = null;
    //       album.status = `off`;
    //       playing = false;
    //       song = null;
    //       clearInterval(interval);
    //     }
    //     this.statusPlayer.next({
    //       albumId: album.id,
    //       song,
    //       playing,
    //       current,
    //       ratio,
    //       total
    //     });
    //   };
    //   interval = setInterval(progress, 1000);
    // }

    // if (stop === true) {
    //   clearInterval(interval);
    // }

  }

}
