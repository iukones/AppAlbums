import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumsListComponent } from './components/albums-list-components';

const appRoutes: Routes = [
    { path: '', component: AlbumsListComponent },
    { path: '**', component: AlbumsListComponent } 
];


export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
