import { Component, OnInit, Inject, Input, EventEmitter, Output} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DialogData } from '../class/dialog-data';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Product } from '../class/product';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { LocationService } from '../services/location.service';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth/auth.service';
import { UserProfile } from '../class/user-profile';


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
  location; 
  data;
  profileUser;
  canSend = true;

  categories = [
    "Wigs", "Natural Hair", "Protective Styling"
  ];

  brandList = [
    "Mane Choice", "Shea Moisture", "Janet Collection", "Other"
  ]
  constructor(
    private router: Router,
    private afs: AngularFirestore, 
    private db: AngularFireDatabase, 
    private locationService: LocationService,
    private dataService: DataService, 
    private auth: AuthService,
    private userProfile: UserProfile
  ) {
      this.newProduct = {};
    }
    
    ngOnInit() {
      this.locationService.getCurrentLocation((pos) => {
        this.location = pos;
        this.canSend;
      });
  
      this.location = this.locationService.location;
     
      
      // console.log('this is the location attribute', this.location);
      // this.productList = this.db.list('/products');
      // const product = this.db.list<Product>('/products');
      this.profileUser = this.auth.getCurrentUser();             
    }

  cancel() {
    this.doneAddingProduct.emit({update: false})
  }

  done() {
    if(this.location && this.location.long & this.location.lat) {
      this.newProduct.uid = this.profileUser.uid
      this.newProduct.long = this.location.long;
      this.newProduct.lat = this.location.lat;
      this.newProduct.date = new Date().toISOString();
      // this.productList.push(this.newProduct);
      this.canSend = false;
      this.data = this.dataService.addProduct(this.newProduct)
        .subscribe((prod) => {
          this.canSend = true;
          this.doneAddingProduct.emit({update: false});
        }, (err) => {
          console.log('there was an error');
        })
    } 
    
  }

  onFileSelected(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      this.newProduct.image = this.imageUrl;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

}
