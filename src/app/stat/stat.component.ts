import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AlbumService } from '../album.service';
import { Album } from '../album';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {

  @Input() album: Album;

  notes: Array<number> = [];
  selected: Album;
  elt: string;

  constructor(private router: Router, private albumS: AlbumService) { }

  ngOnInit() { }

}
