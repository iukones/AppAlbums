import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ImageService} from '../services/imageService';
import {Image} from '../models/imageModel';
import {GLOBAL} from '../services/global';

@Component({
    selector: 'image-edit',
    templateUrl: '../views/image-add.html',
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
        this.titulo = 'Imagen';
        this.botonTitulo = 'Subir';
        this.is_edit = true;
    }

    ngOnInit(){
        // console.log("imageEditComponent.ts cargado");
        this.image = new Image("", "", "");
        this.getImage();

    }

    getImage(){
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._imageService.getImage(id).subscribe(
                response => {
                  this.image = response.image;
                  if(!response.image){
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

        });

    }

    onSubmit(){

        this._route.params.forEach((params: Params) => {

            let id = params['id'];


            this._imageService.editImage(id, this.image).subscribe(
                response => {
                  this.image = response.image;
                  if(!response.image){
                      alert("Error en el servidor");
                  }else{
                    console.log(this.filesToUpload);
                    if(!this.filesToUpload){
                        this._router.navigate(['/album', this.image.album]);

                    }else{
                    // subir imagen
                    this.makeFileRequest(GLOBAL.url + 'upload-image/' + id, [], this.filesToUpload)
                                      .then((result) => {
                                        this.resultUpload = result;
                                        this.image.picture = this.resultUpload.filename;
                                        this._router.navigate(['/album', this.image.album]);
                                        },
                                        (error) => {
                                        console.log(error);
                                        }
                                      );
                                    }
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






                        public filesToUpload: Array<File>;
                        public resultUpload;

                        fileChangeEvent(fileInput: any){
                            this.filesToUpload = <Array<File>>fileInput.target.files;

                        }

                        makeFileRequest(url: string, params: Array<string>, files: Array<File>){
                                return new Promise(function(resolve, reject){
                                var formData:any = new FormData();
                                var xhr = new XMLHttpRequest();

                                for(var i = 0; i < files.length; i++){
                                    formData.append('image', files[i], files[i].name);
                                }

                                xhr.onreadystatechange = function(){
                                    if(xhr.readyState == 4){
                                        if(xhr.status == 200){
                                            resolve(JSON.parse(xhr.response));
                                        }else{
                                            reject(xhr.response);
                                        }
                                    }
                                }
                                xhr.open('POST', url, true);
                                xhr.send(formData);
                            });

                        }


}
