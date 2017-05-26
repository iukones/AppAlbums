import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ImageService} from '../services/imageService';
import {Image} from '../models/imageModel';

@Component({
    selector: 'image-add',
    templateUrl: '../views/image-add.html',
    providers: [ImageService]

})
export class ImageAddComponent implements OnInit{
    public titulo: string;
    public botonTitulo: string;
    public image: Image;
    public errorMessage: any;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _imageService: ImageService
    ){
        this.titulo = 'Agregar Imagen';
        this.botonTitulo = 'selecciona imagen';
    }

    ngOnInit(){
        // console.log("imageAddComponent.ts cargado");
        this.image = new Image("", "", "");

    }

    onSubmit(){
        this._route.params.forEach((params: Params) => {
            let album_id = params['album'];
            this.image.album = album_id;

            this._imageService.addImage(this.image).subscribe(
                response => {
                  this.image = response.image;
                  if(!response.image){
                      alert("Error en el servidor");
                  }else{
                      this._router.navigate(['/editar-imagen', response.image._id]);
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
