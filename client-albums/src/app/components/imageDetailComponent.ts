import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {ImageService} from '../services/imageService';
import {Image} from '../models/imageModel';


@Component({
    selector: 'image-detail',
    templateUrl: '../views/image-detail.html',
    providers: [ImageService]

})
export class ImageDetailComponent implements OnInit{
    public image: Image;
    public api_url: string;
    public errorMessage: any;
    public confirmado: any;
    // public botonEdit: string;
    // public botonImg: string;
    // public album: Album;
    // public images: Image[];


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        // private _albumService: AlbumService,
        private _imageService: ImageService
    ){
        // this.titulo = 'Detalle Album ';
        // this.botonEdit = 'Editar album';
        // this.botonImg = 'Añadir foto';
    }

    ngOnInit(){
        // console.log("imageDetailComponent.ts cargado");
        this.api_url = this._imageService.getApiUrl('get-image/');
        // alert(this.api_url);
        this.getImage();

    }

    getImage(){
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._imageService.getImage(id).subscribe(
                result => {
                    this.image = result.image;
                    // console.log(this.albums[1].title);

                    if(!this.image){
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

    onDeleteConfirm(id){
          this.confirmado = id;
      }

      onCancelImage(){
          this.confirmado = null;
      }

      onDeleteImage(id){
          this._imageService.deleteImage(id).subscribe(
              result => {
                  if(!result.image){
                      alert('Error en el servidor');
                  }
                //   this.getImage();
                  this._router.navigate(['/album', result.image.album]);
                //   this._router.navigate(['/']);
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
