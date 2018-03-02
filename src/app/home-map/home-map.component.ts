import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';


declare var google;
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
@Component({
  selector: 'app-home-map',
  templateUrl: './home-map.component.html',
  styleUrls: ['./home-map.component.scss']
})
// just an interface for type safety.
export class HomeMapComponent implements OnInit {
  done: boolean;
  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ]
  
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  public latitude: number;
  public longitude: number;
  public defaultStoreLat: number;
  public defaultStoreLong: number; 
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place = google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }
     
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        this.markers.push({
          lat: this.latitude, 
          lng: this.longitude, 
          draggable: true,
          label: 'C'
        }, this.setDefaultStorePosition());
        this.setDefaultStorePosition();
      });
    }
    this.done = true;
  }

  mapClicked (obj) {
    this.markers.push({
      lat: obj.latitude,
      lng: obj.longitude,
      label: obj.label, 
      draggable: true
    });
  }

  private setDefaultStorePosition () {
    this.defaultStoreLat = this.latitude ? this.latitude + 0.5 : null ;
    console.log('this si the default store lat', this.defaultStoreLat);

    console.log('this is the mapp list', this.markers);
    this.defaultStoreLong = this.longitude ? this.longitude + 0.4 : null;
    return {lat: this.defaultStoreLat, lng: this.defaultStoreLong, label: 'D', draggable: true };
  };
}