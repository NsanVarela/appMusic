import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';
import { ShareModule } from '../share/share.module';



@NgModule({
  declarations: [AlbumComponent],
  imports: [
    CommonModule, // importe les directives classiques comme ngIf ngFor
    ShareModule
  ],
  exports: [
    AlbumComponent
  ]
})
export class AdminModule { }
