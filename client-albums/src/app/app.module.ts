import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { routing, appRoutingProviders } from './routes/appRoutes';
import { AppComponent }  from './app.component';

import { AlbumsListComponent } from './components/albumListComponent';
import { AlbumAddComponent } from './components/albumAddComponent';

@NgModule({
  declarations: [
    AppComponent,
    AlbumsListComponent,
    AlbumAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
