import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { LocationService } from  '../services/location.service';
import { DataService } from  '../services/data.service';


class Category {
  name?: string;
  subcategories?: [
    {
      name?: string, 
      products?: [
        {

        }
      ]
    }
  ]

}

class SubCategory {
  name?: string;

}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  categoryList: AngularFirestoreCollection<Category>;
  categories: Observable<any[]>;

  categoryDoc: AngularFirestoreDocument<Category>;
  category: Observable<Category>;

  constructor(private afs: AngularFirestore, private router: Router, private locationService: LocationService, private dataService: DataService) {
    this.categoryList = this.afs.collection('categories');
    this.categories = this.categoryList.valueChanges();
    }
    
  ngOnInit() {
    this.categoryList = this.afs.collection<Category>('/categories');
    this.categories = this.categoryList.valueChanges();
    this.categoryDoc = this.afs.doc('categories/PMhBPkMtT3H0LEYBT44K');
    this.category = this.categoryDoc.valueChanges();
    this.locationService.getCurrentLocation(function(pos) {
    })

    // this.dataService.getUsers().subscribe((products) => {
    //   console.log('these are the products', products);
    // })
    
    
  }

  goToMapView () {
    this.router.navigate(['/home']);
  }

  searchDatabase() {
    // if(this.categories) {
      // console.log('these are the categories', this.categories);
    // } else {
      this.router.navigate(['create-demand', {skipLocationChange: true}])
    // }
  }
}
