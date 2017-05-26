import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsListComponent } from '../components/albumListComponent';
import { AlbumAddComponent } from '../components/albumAddComponent';
import { AlbumDetailComponent } from '../components/albumDetailComponent';
import { AlbumEditComponent } from '../components/albumEditComponent';
import { ImageAddComponent } from '../components/imageAddComponent';
import { ImageEditComponent } from '../components/imageEditComponent';
import { ImageDetailComponent } from '../components/imageDetailComponent';


const appRoutes: Routes = [
  {path: '', component: AlbumsListComponent},
  {path: 'album/:id', component: AlbumDetailComponent},
  {path: 'agregar-album', component: AlbumAddComponent},
  {path: 'editar-album/:id', component: AlbumEditComponent},
  {path: 'agregar-imagen/:album', component: ImageAddComponent},
  {path: 'editar-imagen/:id', component: ImageEditComponent},
  {path: 'imagen/:id', component: ImageDetailComponent},
  // la ruta ** va al final de todas las rutas ya que esta indica url no existente.
  {path: '**', component: AlbumsListComponent}

]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
