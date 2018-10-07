import { Component, OnInit, Inject, Input, EventEmitter, Output} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DialogData } from '../class/dialog-data';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Product } from '../class/product';


class newProduct {
  name?: string;
  category?:string; 
  subcategory?:string;
  brand?: {
    name?:string;
  }
  description?:string;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  @Output() doneAddingProduct = new EventEmitter();
  productList: AngularFirestoreCollection<Product>;
  newProduct: Product;

  categories = [
    "Wigs", "Natural Hair", "Protective Styling"
  ];

  brandList = [
    "Mane Choice", "Shea Moisture", "Janet Collection", "Other"
  ]
  constructor(
    private router: Router,
    private afs: AngularFirestore, ) {
      this.productList = this.afs.collection<Product>('/products');
      this.newProduct = {};
   }

  ngOnInit() {
  }

  cancel() {
    this.doneAddingProduct.emit({update: false})
  }

  done() {
    console.log('thisis the new product : ', this.newProduct);
    // this.productList.add(this.newProduct)
    this.doneAddingProduct.emit({update: false})
  }

}
