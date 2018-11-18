import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import 'rxjs/add/operator/map';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Product } from '../class/product';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { LocationService } from '../services/location.service';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

class newProduct {
  name?: String;
  price?:String;
  brand?: String;
  description?:String;
  keywords?: String;
  image?: String; 
  long?: Number;
  lat?: Number;
  date?: String;
  uid?: String;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileUser: any;
  profile: any;
  newProduct: Product;
  authorizedUser: any;
  canEdit = false;
  fileToUpload: File;
  imageUrl: string = null; 
  location; 
  data;
  canSend = true;
  public searchControl: FormControl;
  public zoom: number;

  constructor(private afs: AngularFirestore, 
    private db: AngularFireDatabase, 
    private locationService: LocationService,
    private dataService: DataService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) { 
    this.newProduct = {};
  }
  
  @ViewChild("search")
  public searchElementRef: ElementRef;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log('this is the params', params)
      this.profile = this.dataService.getUser(params.id)
          .subscribe((user) => {
            console.log('who is the user', user);
            if(this.dataService.profileLookup) {
              this.profile = this.dataService.profileLookup; 
            } else {
              this.profile = user;
            }
            console.log('what is the user in params', user);
            
            this.auth.authState.subscribe((auth) => {
              this.profileUser = auth.providerData[0]
              console.log('this is the user', this.profileUser, this.profile);
              if(this.profileUser && this.profile && ( this.profileUser.uid === this.profile.uid)) this.canEdit = true;
              this.authorizedUser = auth ? true : false;
            });
            console.log('does this.profile exist', this.profile);
            if(this.profile) {
              // this.getProducts(this.profile)
            }
          },(err) => {
            console.log('the err for finding user', err);
          });
      })

      //create search FormControl
      this.searchControl = new FormControl();

      this.mapsAPILoader.load().then(() => {
        console.log('this is this search Element Ref', this.searchElementRef.nativeElement)
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          types: ["address"]
        });
        // this.openSearch();
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place = autocomplete.getPlace();
            console.log('this is is the place object', place);
            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
  
            // //set latitude, longitude and zoom
            // this.latitude = place.geometry.location.lat();
            // this.longitude = place.geometry.location.lng();
            // this.zoom = 12;
          });
        });
      });
   
  }

  onFileSelected(file: FileList) {
    this.fileToUpload = file.item(0);
    console.log('this event ', this.fileToUpload);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      console.log(this.imageUrl);
      this.newProduct.image = this.imageUrl;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  
  goToProfile() {
    this.router.navigate(['/profile/'+this.profileUser.uid ])
  }

 
}
