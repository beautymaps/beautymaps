import { Component, OnInit, Inject, Input, EventEmitter, Output} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DialogData } from '../class/dialog-data';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Product } from '../class/product';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';



class newProduct {
  name?: string;
  price?:string;
  brand?: string;
  description?:string;
  keywords?: string;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  @Output() doneAddingProduct = new EventEmitter();
  productList : any;
  newProduct: Product;
  fileToUpload: File;
  imageUrl: string = null; 

  categories = [
    "Wigs", "Natural Hair", "Protective Styling"
  ];

  brandList = [
    "Mane Choice", "Shea Moisture", "Janet Collection", "Other"
  ]
  constructor(
    private router: Router,
    private afs: AngularFirestore, private db: AngularFireDatabase) {
      this.newProduct = {};
    }
    
    ngOnInit() {
      this.productList = this.db.list('/products');
      const product = this.db.list<Product>('/products')
      console.log('this is the produc :', product);
    }

  cancel() {
    this.doneAddingProduct.emit({update: false})
  }

  done() {
    console.log('thisis the new product : ', this.newProduct);
    this.productList.push(this.newProduct)
    this.doneAddingProduct.emit({update: false})
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

}
