import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginateComponent } from '../paginate/paginate.component';
import { NumberSongsPipe } from '../number-songs.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PaginateComponent,
    NumberSongsPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginateComponent,
    NumberSongsPipe,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ShareModule { }
