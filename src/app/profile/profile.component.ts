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
  products: Observable<any[]>
  productListView = true;
  profileUser: any;
  profile: any;
  authorizedUser: any;
  canEdit = false;

  constructor(private afs: AngularFirestore, 
    private db: AngularFireDatabase, 
    private locationService: LocationService,
    private dataService: DataService,
    private auth: AuthService,
    private route: Router,
    private router: ActivatedRoute
  ) { 
    // this.productList = this.af.list<Product>('/products');
    // this.products = this.db.list('/products').valueChanges();
    
    // console.log('this the products :', this.products);
  }
  
  ngOnInit() {
    // this.router.params.subscribe((params: Params) => {
    //   console.log('this is the params', params)
    //     this.dataService.getUser(params.id)
    //       .subscribe((user) => {
    //         this.profile = user;
    //       })
    //     })
        this.profile = this.dataService.profileLookup; 
        if(this.profile) {
          this.products = this.dataService.getUserProducts(this.profile.uid)
          this.products.subscribe((prod) => {
            console.log('we found this users products,', prod);
          })
        }
        this.auth.authState.subscribe((auth) => {
          this.profileUser = auth.providerData[0]
          console.log('this is the user', this.profileUser, this.profile);
          if(this.profileUser && this.profile && ( this.profileUser.uid === this.profile.uid)) this.canEdit = true;
          this.authorizedUser = auth ? true : false;
        });
        
    // this.productList$ = this.af.list('/products');
    // this.products = this.productList.valueChanges();
  }

  
  addProduct () {
    this.productListView = false;
  }

  doneAdding (ev) {
    console.log('what is the eve', ev)
    if(ev.update) {
      this.productListView = !this.productListView;

    } else {
      this.productListView = !this.productListView;
      // this.products.push(this.product);
      // console.log('what happens to the products list:', this.products);
    }
  }
}
