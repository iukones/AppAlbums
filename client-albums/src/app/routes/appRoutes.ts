import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsListComponent } from '../components/albumListComponent';
import { AlbumAddComponent } from '../components/albumAddComponent';


const appRoutes: Routes = [
  {path: '', component: AlbumsListComponent},
  {path: 'agregar-album', component: AlbumAddComponent},
  // {path: 'album/:id', component: AlbumAddComponent },
  // {path: 'editar-marcador/:id', component: FavoritoEditComponents },
  // la ruta ** va al final de todas las rutas ya que esta indica url no existente.
  {path: '**', component: AlbumsListComponent}

]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
