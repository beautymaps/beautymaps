import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import 'rxjs/add/operator/map';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UserProfile } from '../class/userProfile';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { LocationService } from '../services/location.service';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  
  profile: any;
  authorizedUser: any;
  canEdit = false;
  fileToUpload: File;
  imageUrl: string = null; 
  location; 
  data;
  canSend = true;
  public searchControl: FormControl;
  public zoom: number;
  coordinates:any;

  constructor(private afs: AngularFirestore, 
    private db: AngularFireDatabase, 
    private locationService: LocationService,
    private dataService: DataService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private updatedProfileUser: UserProfile,
    private profileUser: UserProfile
  ) { 
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
              console.log('this is the profile user', this.profileUser, this.profile._id);
              if(this.profileUser && this.profile && ( this.profileUser.uid === this.profile.uid)) this.canEdit = true;
              this.authorizedUser = auth ? true : false;
            });
            console.log('does this.profile exist', this.profileUser);
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
            this.coordinates = place.geometry.location;
            console.log('this is is the place object', place);
            this.updatedProfileUser.long = this.coordinates.lng();
            this.updatedProfileUser.lat = this.coordinates.lat();
            this.updatedProfileUser.address = place.formatted_address;
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
      this.updatedProfileUser.photoURL = this.imageUrl;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  
  goToProfile() {
    this.router.navigate(['/profile/'+this.profile.uid ])
  }

  done() {
    // if(this.location && this.location.long & this.location.lat) {
    this.canSend = false;
    this.updatedProfileUser.displayName = this.profile.displayName;
    this.data = this.dataService.updateUser(this.profile._id, this.updatedProfileUser)
      .subscribe((updatedUser) => {
        console.log('this is the prod we found', updatedUser);
        this.canSend = true;
        this.goToProfile();
      }, (err) => {
        console.log('there was an error');
      })
    // } 
    
  }
 
}
