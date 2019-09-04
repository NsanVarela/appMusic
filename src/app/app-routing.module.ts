import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';
import { LoginComponent } from './login/login.component';
import { AlbumDescriptionComponent } from './album-description/album-description.component';


const albumRoutes: Routes = [
  {
    path : 'albums',
    component : AlbumsComponent
  },
  {
    path: '',
    redirectTo: '/albums',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'album/:id',
    component: AlbumDescriptionComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(albumRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
