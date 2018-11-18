import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Product } from '../class/product';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SearchModalComponent } from '../shared/search-modal/search-modal.component';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


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
      label: '6',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: '4',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: '6',
      draggable: true
    }
  ]
  
  users =[];
  products;
  userList;
  productList;
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, 
    private db: AngularFireDatabase,
    private dialog: MatDialog, 
    private dataService: DataService,
    private router: Router
  ) {
    // this.products = this.db.list('/products').valueChanges();
    console.log('this is the users', this.users);
    this.done = true;
    this.productList = this.dataService.getAllProducts()
      .subscribe((product) => {
        this.products = product;
        console.log('this is the product list', this.products)
        return product;
    },  (err) => {})
    this.userList = this.dataService.getAllUsers()
      .subscribe((user) => {
        this.users = user;
        console.log('this is the user from subscribe', this.users);
        return user;
    }, (err) => {console.log('we got an error recieving all users', err)})
  }

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
      // this.openSearch();
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

  viewProducts(user) {
    this.dataService.profileLookup = user;
    this.router.navigate(['/profile/'+user.uid])
  }
     
  openSearch() {
    const loginRef = this.dialog.open(SearchModalComponent, {
      width:'400px',
      data: {heading: 'hey girl this worked', subheading: 'i know girl lets work '},
    })
    loginRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);     
    });
  }
  getLong(long) {
    console.log('this is the long', long);
    return long;
  }
  getLat(lat) {
    console.log('this is the long', lat);
    return lat;
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

    this.defaultStoreLong = this.longitude ? this.longitude + 0.4 : null;
    return {lat: this.defaultStoreLat, lng: this.defaultStoreLong, label: 'D', draggable: true };
  };
}