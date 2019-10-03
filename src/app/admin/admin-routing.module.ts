// ng g m admin/admin-routing --flat --module=admin

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from '../guard.service';
import { AddAlbumComponent } from './add-album/add-album.component';
import { UpdateAlbumComponent } from './update-album/update-album.component';

const adminRoutes: Routes = [
  {
    path: `admin/add`, canActivate: [GuardService],
    component: AddAlbumComponent
  },
  {
    path: `admin/update/:id`, canActivate: [GuardService],
    component: UpdateAlbumComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
