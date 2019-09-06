import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit, OnDestroy {
  @Output() paginate: EventEmitter<{ start: number, end: number }> = new EventEmitter();

  perPage: number = 3; // nombre d'albums par page
  pages: number[] = []; // numéro des pages 1, 2, 3, ...
  total: number = 0; // total des albums
  currentPage: number; // page courante
  numberPages: number = 0; // nombre de page(s)

  constructor(private albumS: AlbumService) {
    this.total = this.albumS.count();

    // Souscription à l'observable
    // Ecoute, et l'observer reçoit l'info
    this.albumS.sendCurrentNumberPage.subscribe(pageNumber => {
      // console.log(`pageNumber :`, pageNumber);
      this.currentPage = pageNumber;
    });
  }

  ngOnInit() {
    // initialiser la création des numéros de page
    this.init();
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

    // Notifie aux observers le numéro de page
    this.albumS.currentPage(page);
  }

  next() {
    this.currentPage = (this.currentPage === this.numberPages) ? 1 : this.currentPage + 1;
    this.selectedPage(this.currentPage);
  }

  previous() {
    this.currentPage = (this.currentPage === 1) ? this.numberPages : this.currentPage - 1;
    this.selectedPage(this.currentPage);
  }

  // Le component est détruit au changement de page
  ngOnDestroy() {
    // console.log(`destroy...`);
  }

}



