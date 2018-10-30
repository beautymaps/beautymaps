import { Injectable,  } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result:any;
  
    constructor(private _http: Http) {

     }

    getAllProducts() {
      return this._http.get("/api/get-all-products")
        .map(result => result.json());
    }
    
    addProduct(productObj) {
      console.log('this add product function is run', productObj);
      return this._http.post("/api/add-product", productObj).subscribe((prod) => {
        console.log(prod)
      })
    }


}
