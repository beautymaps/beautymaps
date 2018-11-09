import { Injectable,  } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result:any;
  profileLookup;
  
    constructor(private _http: Http) {

     }

    getAllProducts() {
      return this._http.get("/api/get-all-products")
        .map(result => {

          console.log('this is the result', result.json())
          return result.json();
        });
    }

    getAllUsers() {
      return this._http.get("/api/get-all-users")
        .map(result => {

          console.log('this is the result', result.json())
          return result.json();
        });
    }

    getUser(id) {
      return this._http.get('/api/user/'+id)
      .map(result => {
        console.log('this is the result', result.json())
        return result.json();
      });
    }
    
    addProduct(productObj) {
      console.log('this add product function is run', productObj);
      return this._http.post("/api/add-product", productObj)
      .subscribe((prod) => {
        console.log('this is the prod we found', prod);
      }, (err) => {
        console.log('there was an error');
      })
    
    }

    getUserProducts(id) {
      return this._http.get('/api/user-product/'+id)
      .map(result => {
        console.log('this is the result', result.json())
        return result.json();
      });
    }

}
