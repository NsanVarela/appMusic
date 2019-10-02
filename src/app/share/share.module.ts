import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginateComponent } from '../paginate/paginate.component';
import { NumberSongsPipe } from '../number-songs.pipe';



@NgModule({
  declarations: [
    PaginateComponent,
    NumberSongsPipe
  ],
  imports: [
    CommonModule
  ], exports: [
    PaginateComponent,
    NumberSongsPipe
  ]
})
export class ShareModule { }
