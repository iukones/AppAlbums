import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AlbumService} from '../services/albumService';
import {ImageService} from '../services/imageService';
import {Album} from '../models/albumModel';
import {Image} from '../models/imageModel';


@Component({
    selector: 'album-detail',
    templateUrl: '../views/album-detail.html',
    providers: [AlbumService, ImageService]

})
export class AlbumDetailComponent implements OnInit{
    public titulo: string;
    public botonEdit: string;
    public botonImg: string;
    public album: Album;
    public images: Image[];
    public api_url: string;
    public errorMessage: any;
    public confirmado;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _albumService: AlbumService,
        private _imageService: ImageService
    ){
        this.titulo = 'Detalle Album ';
        this.botonEdit = 'Editar album';
        this.botonImg = 'Añadir foto';
    }

    ngOnInit(){
        // console.log("albumDetailComponent.ts cargado");
        this.api_url = this._imageService.getApiUrl('get-image/');
        // alert(this.api_url);
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
                    }else{
                        // llamada al metodo de servicio de imagenes para listar todas las imagenes
                        this._imageService.getImages(result.album._id).subscribe(
                            response => {
                                this.images = response.images;
                                if(!this.images){
                                    alert('Sin imagenes');
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

    onDeleteConfirm(id){
          this.confirmado = id;
      }

      onCancelAlbum(){
          this.confirmado = null;
      }

      onDeleteAlbum(id){
          this._albumService.deleteAlbum(id).subscribe(
              result => {
                  if(!result.album){
                      alert('Error en el servidor');
                  }
                  this._router.navigate(['/']);
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
