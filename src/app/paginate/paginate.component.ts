import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { AlbumService } from '../album.service';

import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit, OnDestroy {
  @Output() paginate: EventEmitter<{ start: number, end: number }> = new EventEmitter();
  @Input() perPage: number; // dans le selecteur du paginate depuis le parent

  pages: number[] = []; // numéro des pages 1, 2, 3, ...
  total: number = 0; // total des albums
  currentPage: number; // page courante
  numberPages: number = 0;

  constructor(private aS: AlbumService) {
    this.total = this.aS.count();
    console.log(this.total);

    // this.total = this.numberAlbums;
  }

  ngOnInit() {
    // initialiser la création des numéros de page
    this.init();

    // il faut souscrire à l'observable
    // écoute et l'observer reçoit l'info
    if ( this.aS.sendCurrentNumberPage.closed ) {
      this.aS.initSubject();
    }

    this.aS.sendCurrentNumberPage.subscribe(
      page => { console.log(page); this.currentPage = page; }
    );
  }

  init(page: number = 1) {
    this.numberPages = Math.ceil(this.total / this.perPage);
    this.currentPage = page;

    for (let p = 0; p < this.numberPages; p++) {
      this.pages.push(p + 1);
    }
  }

  selectedPage(page: number) {
    this.currentPage = page;

    const start = (page - 1) * this.perPage;
    const end = start + this.perPage;

    this.paginate.emit({ start, end });

    // notifier aux observers le numéro de la page
    this.aS.currentPage(page);
  }

  next() {
    this.currentPage = (this.currentPage === this.numberPages) ? 1 : this.currentPage + 1;
    this.selectedPage(this.currentPage);
  }

  previous() {
    this.currentPage = (this.currentPage === 1) ? this.numberPages : this.currentPage - 1;
    this.selectedPage(this.currentPage);
  }

  // component est retiré du DOM
  ngOnDestroy() {
    console.log('destroy...');

    // une fois le component démonté on se désinscrit au Subject
    this.aS.sendCurrentNumberPage.unsubscribe();
  }

}
