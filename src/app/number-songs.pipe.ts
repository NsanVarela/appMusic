import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { AlbumService } from './album.service';

@Pipe({
  name: 'numberSongs' // nom du pipe à utliliser dans le template
})
export class NumberSongsPipe implements PipeTransform {

  constructor(private albumS: AlbumService) {}

  transform(id: string): Observable<number> {
    console.log('innnnn');
    return this.albumS.getAlbumListNumber(id); // nombre de chanson pour un album dans le service
  }

}
