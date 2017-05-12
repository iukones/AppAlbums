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
        return this._http.get(this.url+'albums').map(res => res.json());
    }
}
