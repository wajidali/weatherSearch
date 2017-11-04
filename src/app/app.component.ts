
// our root app component
import {AfterViewInit, Component, ElementRef, ViewChild, NgModule, VERSION, ChangeDetectorRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GoogleMapsService} from 'google-maps-angular2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  weather: any;
  @ViewChild('mapElement') mapElement: ElementRef;
  @ViewChild('inputElement') inputElement: ElementRef;

  private map: any;

  constructor(private gapi: GoogleMapsService, private http: HttpClient, private cdRef: ChangeDetectorRef ) {

  }

  ngAfterViewInit(): void {
    /**
     * Init map api [google.maps]
     */
    this.gapi.init.then(maps => {
      const loc = new maps.LatLng(59.436962, 24.753574);

      this.map = new maps.Map(this.mapElement.nativeElement, {
        zoom: 13,
        center: loc,
        scrollwheel: false,
        panControl: false,
        mapTypeControl: false,
        zoomControl: true,
        streetViewControl: false,
        scaleControl: true,
        zoomControlOptions: {
          style: maps.ZoomControlStyle.LARGE,
          position: maps.ControlPosition.RIGHT_BOTTOM
        }
      });


      // const weatherLayer = maps.weather.WeatherLayer({
      //   temperatureUnits: maps.weather.TemperatureUnit.FAHRENHEIT
      // });
      // weatherLayer.setMap(this.map);

      const input = this.inputElement.nativeElement;
      const options = {

      };

      const autocomplete = new maps.places.Autocomplete(input, options);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const location = place.geometry.location;

        this.http.get(
          'http://weathermicroservice.azurewebsites.net/api/v1/Weather?lat='
            + location.lat() + '&lon='
            + location.lng(), { headers: new HttpHeaders({'Accept' : '*/*' }) })
          .subscribe(r => {
          this.weather = r;
          console.log(this.weather);
            this.cdRef.detectChanges();
        });

        this.map.setZoom(13);
        this.map.setCenter({
          lat: location.lat(),
          lng: location.lng()
        });
      });
    });
  }
}
