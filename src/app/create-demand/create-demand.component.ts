import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

class Product {
  name?: string;
  category?:string; 
  subcategory?:string;
  brand?: {
    name?:string;
  }
  description?:string;
}

@Component({
  selector: 'app-create-demand',
  templateUrl: './create-demand.component.html',
  styleUrls: ['./create-demand.component.scss']
})
export class CreateDemandComponent implements OnInit {
  productList: AngularFirestoreCollection<Product>;
  products: Observable<any[]>
  newContent: {name:string ,category: string, subcategory:string};

  constructor(private afs: AngularFirestore) {
    this.productList = this.afs.collection<Product>('/products');
    this.products = this.productList.valueChanges();

    this.newContent = {name: '', category:'', subcategory: ''}
   }

   
  ngOnInit() {

    this.productList = this.afs.collection<Product>('/products');
    this.products = this.productList.valueChanges();
  }

  collectData() {
    console.log('this si the new content :', this.newContent);
    this.productList.add( this.newContent)
  }
}
