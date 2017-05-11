import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsListComponent } from '../components/albumListComponent';


const appRoutes: Routes = [
  {path: '', component: AlbumsListComponent},
  // {path: 'marcador/:id', component: FavoritoDetailComponents },
  // {path: 'agregar-marcador', component: FavoritoAddComponents},
  // {path: 'editar-marcador/:id', component: FavoritoEditComponents },
  // la ruta ** va al final de todas las rutas ya que esta indica url no existente.
  {path: '**', component: AlbumsListComponent}

]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
