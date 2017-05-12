import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AlbumService} from '../services/albumService';
import {Album} from '../models/albumModel';

@Component({
    selector: 'albums-list',
    templateUrl: '../views/albums-list.html',
    providers: [AlbumService]

})
export class AlbumsListComponent implements OnInit{
    public titulo: string;
    public albums: Album[];
    public errorMessage: any;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _albumService: AlbumService
    ){
        this.titulo = 'Listado:';
    }

    ngOnInit(){
        console.log("albumsListComponent.ts cargado");
        this.getAlbums();
    }

    getAlbums(){
        this._albumService.getAlbums().subscribe(
            result => {
                this.albums = result.albums;
                console.log(this.albums[1].title);

                if(!this.albums){
                    alert('Error en el servidor');
                }
            },
            error => {
                this.errorMessage = <any>error;

                if(this.errorMessage != null){
                    console.log(this.errorMessage);

                }
            }
        );
    }
}
