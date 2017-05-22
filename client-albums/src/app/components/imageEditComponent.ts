import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ImageService} from '../services/imageService';
import {Image} from '../models/imageModel';

@Component({
    selector: 'image-edit',
    templateUrl: '../views/image-edit.html',
    providers: [ImageService]

})
export class ImageEditComponent implements OnInit{
    public titulo: string;
    public botonTitulo: string;
    public image: Image;
    public errorMessage: any;
    public is_edit: boolean;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _imageService: ImageService
    ){
        this.titulo = 'Edición de Imagen';
        this.botonTitulo = 'Editar';
        this.is_edit = true;
    }

    ngOnInit(){
        console.log("imageEditComponent.ts cargado");
        this.image = new Image("", "", "");

    }

    onSubmit(){
        this._route.params.forEach((params: Params) => {
            let album_id = params['album'];
            this.image.album = album_id;

            this._imageService.editImage(this.image).subscribe(
                response => {
                  this.image = response.image;
                  if(!response.image){
                      alert("Error en el servidor");
                  }else{
                    //   this._router.navigate(['/album', id]);
                  }
                },
                error => {
                    this.errorMessage = <any>error;
                    if(this.errorMessage != null){
                        console.log(this.errorMessage);
                    }
                }
            );

        });
        console.log(this.image);
    }

}
