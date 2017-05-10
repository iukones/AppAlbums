import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'albums-list',
    templateUrl: '../views/albums-list.html',
    // styleUrls: ['../assets/css/w3.css']
})


export class AlbumsListComponent implements OnInit{
    public titulo: string;

    // this.titulo = "listado de albums: "

    ngOnInit(){
        console.log("albums-list-components.ts Cargado")
    }
}
