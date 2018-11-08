import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth} from "angularfire2/auth";
import { auth } from 'firebase';
import { FirebaseApp } from "angularfire2";
import * as firebase from 'firebase/app';
// import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable()
export class AuthService {
  currentUser: any;
  authState: any;
  authorizedUser: any;
  constructor(public afAuth: AngularFireAuth, private af: FirebaseApp, private _http: Http) {
    af.auth().onAuthStateChanged((auth)=>{
      console.log('this the current auth state', auth)
      this.currentUser = auth ? auth.providerData[0] : null;
    })

   
    this.authState = afAuth.authState
  
    
    // this.authState.subscribe((auth) => {
    //   this.authState = auth;
    // });
   }

  getCurrentUser() {
    return this.currentUser;
  }

  doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        console.log('the res', res)
        this.findUser(res.user.providerData[0]);
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })

    })
 }

 doGoogleLogin(){
  return new Promise<any>((resolve, reject) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.afAuth.auth
    .signInWithPopup(provider)
    .then(res => {
      resolve(res);
    })
  })
}

findUser (userData) {
  return this._http.post('/api/login-user', userData)
    .subscribe((user) => {
      // console.log('this is the user we found', user);
    })
}

logOut() {
  this.afAuth.auth.signOut();
}

}
