import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlbumService } from '../album.service';
import { Album } from '../album';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() searchAlbums: EventEmitter<Album[]> = new EventEmitter();
  @Output() reload: EventEmitter<boolean> = new EventEmitter();

  // tslint:disable-next-line: no-inferrable-types
  word: string = ``;
  isSubmit = false;

  constructor(private albumS: AlbumService) { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    this.albumS.search(form.value[`word`]).subscribe(albums => {
      if (albums.length > 0) {
        this.searchAlbums.emit(albums);
        this.isSubmit = true;
      }
    });
  }

  // on vérifie la longueur d'une chaîne de caractères qui passe dans le champ input
  // typer cette chaîne pour ne pas avoir de problème avec la méthode length
  onChangeEmit($event: string) {

    console.log($event.length);

    if ($event.length === 0  && this.isSubmit) {
      console.log(`Ok event reload`);
      this.reload.emit(true);
      this.isSubmit = false;
    }
  }

}
