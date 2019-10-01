import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { Album } from '../album';

// définir l'ordre sur les albums
type Order  = (a : Album, b : Album) => number;

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
  perPage: number = 4; // définir le nombre d'album par page
  albums: Album[] = []; // affichez les albums dans le template

  // pour la pagination & l'ordre qui peut changer
  start: number = 0;
  end: number = 4;

  constructor(private aS: AlbumService) { }

  ngOnInit() {
    // attention de ne pas hardcoder les valeurs dans le code
    // utilisez des variables par exemple pour this.perPage
    // cet ordre se fait de manière globale : sort puis slide !
    this.albums = this.aS.paginate(0, this.perPage,
      this.orderAvg(true)  // voir cette fonction dans le code elle permet de définir l'ordre
    );
  }

  paginateParent($event: { start: number, end: number }) {
    // affectation de variable en mode spread
    const { start, end } = $event;

    // deux paramètres que l'on utilise pour ordonner les albums visibiles sur une page
    // on utilise ces deux variables ailleurs ...Voyez le code des méthode increase et decrease
    this.start = $event.start;
    this.end = $event.end;

    this.albums = this.aS.paginate(start, end, this.orderAvg(true) ); // ordonne sur tous les albums
  }

  increase(){
    this.albums = this.aS.specialOrderPaginate(this.start, this.end, this.orderAvg(true));
  }

  decrease(){
    this.albums = this.aS.specialOrderPaginate(this.start, this.end, this.orderAvg(false));
  }

  // permet de définir l'ordre si true décroissant
  private orderAvg(sens : boolean = true): Order {

    return (a, b) =>
    sens ? this.aS.avg(b.note) - this.aS.avg(a.note) :  this.aS.avg(a.note) - this.aS.avg(b.note);
  }

  // pour avoir le nombre de chanson(s) par album
  numberSongs(id : string){
    const list =  this.aS.getAlbumList(id) ;

    return list? list.list.length : 0;
  }
}
