import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import 'rxjs/add/operator/map';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UserProfile } from '../class/user-profile';
import{ StoreHours } from '../class/store-hours';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { LocationService } from '../services/location.service';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { timestamp } from 'rxjs/operators';

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
  timeList = [];
  storeHours: StoreHours[] = [
    {day: 'Monday', open:'', closed: ''},
    {day: 'Tuesday', open:'', closed: ''},
    {day: 'Wednesday', open:'', closed: ''},
    {day: 'Thursday', open:'', closed: ''},
    {day: 'Friday', open:'', closed: ''},
    {day: 'Saturday', open:'', closed: ''},
    {day: 'Sunday', open:'', closed: ''},
  ];

  constructor(private afs: AngularFirestore, 
    private db: AngularFireDatabase, 
    private locationService: LocationService,
    private dataService: DataService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public updatedProfileUser: UserProfile,
    private profileUser: UserProfile
  ) { 
    this.timeList = this.createTimeList();
  }
  
  @ViewChild("search")
  public searchElementRef: ElementRef;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.profile = this.dataService.getUser(params.id)
          .subscribe((user) => {
            if(this.dataService.profileLookup) {
              this.profile = this.dataService.profileLookup; 
            } else {
              this.profile = user;
              this.storeHours = this.profile.storeHours;
            }            
            this.auth.authState.subscribe((auth) => {
              this.profileUser = auth.providerData[0]
              if(this.profileUser && this.profile && ( this.profileUser.uid === this.profile.uid)) this.canEdit = true;
              this.authorizedUser = auth ? true : false;
            });
          },(err) => {
            console.log('the err for finding user', err);
          });
      })

      //create search FormControl
      this.searchControl = new FormControl();

      this.mapsAPILoader.load().then(() => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          types: ["address"]
        });
        // this.openSearch();
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place = autocomplete.getPlace();
            this.coordinates = place.geometry.location;
            this.updatedProfileUser.long = Number(this.coordinates.lng());
            this.updatedProfileUser.lat = Number(this.coordinates.lat());
            this.updatedProfileUser.address = place.formatted_address;
            console.log('is the address changing,', this.updatedProfileUser.address);
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

  createTimeList() {
    this.timeList;
    for(let i=1; i < 12; i++) {
      let time = i+' am';
      this.timeList.push(time);
    }
    this.timeList.push('12pm');
    for(let i=1; i < 12; i++) {
      let time = i+' pm';
      this.timeList.push(time);
    }
    this.timeList.push('12 am');
    return this.timeList;
  }

  onFileSelected(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      this.updatedProfileUser.profileImage = this.imageUrl;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  
  goToProfile() {
    this.router.navigate(['/profile/'+this.profile.uid ])
  }

  done() {
    // if(this.location && this.location.long & this.location.lat) {
    this.canSend = false;
    
    this.profile.storeHours.map((day, i) => {
      // console.log('what is the profile day', day, i);
    }) 

    this.updatedProfileUser.storeHours.map((day, i) => {
      for (const j in day) {
        day[j] = this.storeHours[i][j];
      }
    }) 
    this.updatedProfileUser.userName = this.profile.userName;
    this.updatedProfileUser.storeName = this.profile.storeName;
    this.data = this.dataService.updateUser(this.profile._id, this.updatedProfileUser)
      .subscribe((updatedUser) => {
        this.canSend = true;
        this.goToProfile();
      }, (err) => {
        console.log('there was an error');
      })
    // } 
    
  }
 
}
