import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AlbumService} from '../services/albumService';
import {Album} from '../models/albumModel';

@Component({
    selector: 'album-edit',
    templateUrl: '../views/album-add.html',
    providers: [AlbumService]

})
export class AlbumEditComponent implements OnInit{
    public titulo: string;
    public botonTitulo: string;
    public album: Album;
    public errorMessage: any;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _albumService: AlbumService
    ){
        this.titulo = 'Editar Album';
        this.botonTitulo = 'Editar';
    }

    ngOnInit(){
        // console.log("AlbumEditComponent.ts cargado");
        this.album = new Album("", "");
        this.getAlbum();
    }

    getAlbum(){
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._albumService.getAlbum(id).subscribe(
                result => {
                    this.album = result.album;
                    // console.log(this.albums[1].title);

                    if(!this.album){
                        this._router.navigate(['/']);
                        // alert('Error en el servidor');
                    }
                },
                error => {
                    this.errorMessage = <any>error;

                    if(this.errorMessage != null){
                        console.log(this.errorMessage);
                        this._router.navigate(['/']);
                    }
                }
            );

        });

    }

    onSubmit(){
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._albumService.editAlbum(id, this.album).subscribe(
                response => {
                    this.album = response.album;

                    if(!response.album){
                        alert('Error en el servidor');
                    }else{
                        this._router.navigate(['/album/', id]);
                    }

                },
                error => {
                    this.errorMessage = <any>error;

                    if(this.errorMessage != null){
                        console.log(this.errorMessage);
                        this._router.navigate(['/']);
                    }
                }

            );
        });

    }
}
