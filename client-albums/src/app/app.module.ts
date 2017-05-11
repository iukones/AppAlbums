import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { routing, appRoutingProviders } from './routes/appRoutes';
import { AppComponent }  from './app.component';
// import { provideRoutes} from '@angular/router';
import { AlbumsListComponent } from './components/albumListComponent';

@NgModule({
  declarations: [
    AppComponent,
    AlbumsListComponent
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
