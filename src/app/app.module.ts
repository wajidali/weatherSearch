import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {GoogleMapsModule} from 'google-maps-angular2';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    GoogleMapsModule.forRoot({
      url: 'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyClhGLmhuCFquf4S0MWUxcMxEamH9BQWM0'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
