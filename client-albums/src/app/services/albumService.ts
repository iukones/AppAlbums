import  {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Album} from '../models/albumModel';
import {GLOBAL} from './global';


@Injectable()

export class AlbumService{
    public url: string;

    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }

    getAlbums(){
        return this._http.get(this.url+'albums')
                         .map(res => res.json());
    }

    getAlbum(id: string){
      return this._http.get(this.url+'album/'+id)
                       .map(res => res.json());
    }

    AddAlbum(album: Album){
      let json = JSON.stringify(album);
      let params = json;
      let headers = new Headers({'Content-Type':'application/json'});

      return this._http.post(this.url+'album', params, {headers: headers})
                                 .map(res => res.json());
    }


}
