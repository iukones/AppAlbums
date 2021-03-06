import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AlbumService} from '../services/albumService';
import {Album} from '../models/albumModel';

@Component({
    selector: 'album-add',
    templateUrl: '../views/album-add.html',
    providers: [AlbumService]

})
export class AlbumAddComponent implements OnInit{
    public titulo: string;
    public botonTitulo: string;
    public album: Album;
    public errorMessage: any;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _albumService: AlbumService
    ){
        this.titulo = 'Agregar Album';
        this.botonTitulo = 'Crear';
    }

    ngOnInit(){
        // console.log("albumAddComponent.ts cargado");
        this.album = new Album("", "");

    }

    onSubmit(){
        this._albumService.AddAlbum(this.album).subscribe(
            response => {
              this.album = response.album;
              if(!response.album){
                  alert("Error en el servidor");
              }else{
                  this._router.navigate(['/']);
              }

            },
            error => {
                this.errorMessage = <any>error;
                if(this.errorMessage != null){
                    console.log(this.errorMessage);
                }
            }
        );
        console.log(this.album);
    }


}
