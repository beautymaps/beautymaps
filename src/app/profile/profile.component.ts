import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Product } from '../class/product';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { LocationService } from '../services/location.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  products: Observable<any[]>
  productListView = true;

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase, private locationService: LocationService) { 
    // this.productList = this.af.list<Product>('/products');
    this.products = this.db.list('/products').valueChanges();
    console.log('this the products :', this.products);
  }

  ngOnInit() {
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
      console.log('what happens to the products list:', this.products);
    }
  }
}
