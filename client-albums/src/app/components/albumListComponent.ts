import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
// import {FavoritoService} from '../services/favoritoServices';
// import {Favorito} from '../models/favoritoModels';

@Component({
    selector: 'albums-list',
    templateUrl: '../views/albums-list.html',
    // providers: [FavoritoService]

})
export class AlbumsListComponent implements OnInit{
    public titulo: string;

    ngOnInit(){
        this.titulo = 'Listado:';
        console.log("albumsListComponent.ts cargado");
    }
}
