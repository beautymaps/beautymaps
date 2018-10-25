import { Injectable,  } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result:any;
  
    constructor(private _http: Http) {

      console.log('this is what you get from get user :', );
     }

  
    
    // getUsers() {
    //   return this._http.get("http://localhost:8080/api/users")
    //     .map(result => this.result = result.json().data);
    // }


}
