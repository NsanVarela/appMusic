import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';
import { ShareModule } from '../share/share.module';
import { AddAlbumComponent } from './add-album/add-album.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UpdateAlbumComponent } from './update-album/update-album.component';

@NgModule({
  declarations: [AlbumComponent, AddAlbumComponent, UpdateAlbumComponent],
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
