import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';
import { ShareModule } from '../share/share.module';
import { AddAlbumComponent } from './add-album/add-album.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [AlbumComponent, AddAlbumComponent],
  imports: [
    CommonModule, // importe les directives classiques comme ngIf ngFor
    ShareModule,
    AdminRoutingModule
  ],
  exports: [
    AlbumComponent
  ]
})
export class AdminModule { }
