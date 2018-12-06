import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Product } from '../class/product';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { LocationService } from '../services/location.service';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  products;
  productList;
  productListView = true;
  profileUser: any;
  profile: any;
  authorizedUser: any;
  canEdit = false;
  publicView = false;
  stars = new Array(5);

  constructor(private afs: AngularFirestore, 
    private db: AngularFireDatabase, 
    private locationService: LocationService,
    private dataService: DataService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.profileUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.profile = this.dataService.getUser(params.id)
          .subscribe((user) => {
            if(this.dataService.profileLookup) {
              this.profile = this.dataService.profileLookup; 
            } else {
              this.profile = user;
            }
            
            if(this.profileUser && this.profile && ( this.profileUser.uid === this.profile.uid)) this.canEdit = true;
             
            if(this.profile) {
              this.getProducts(this.profile)
            }
          },(err) => {
            console.log('the err for finding user', err);
          });
      })
   
  }

  toggleProfileView() {
    this.publicView = !this.publicView;
  }

  goToEditProfile() {
    this.router.navigate(['/profile/'+this.profileUser.uid+'/edit-profile' ])
  }
  getProducts(profile) {
    this.productList = this.dataService.getUserProducts(this.profile.uid)
    this.productList.subscribe((prod) => {
      this.products = prod;
    },  (err) => {})
  }
  
  addProduct () {
    this.productListView = false;
  }

  doneAdding (ev) {
    if(ev.update) {
      this.productListView = !this.productListView;
    } else {
      this.productListView = !this.productListView;
      this.getProducts(this.profile);
    }
  }
}
