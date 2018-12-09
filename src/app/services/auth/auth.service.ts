import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth} from "angularfire2/auth";
import { auth } from 'firebase';
import { FirebaseApp } from "angularfire2";
import * as firebase from 'firebase/app';
import {UserProfile} from '../../class/user-profile';
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
          this.findUser(res.user.providerData[0])
            .subscribe((user) => {
              console.log('this subscribed user', user)
              this.setUserSession(user);
              resolve(res);
            })
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
    let user = new UserProfile();
    console.log('new user object', userData, user);
    user.uid = userData.uid;
    user.providerId = userData.providerId;
    user.profileImage = userData.photoURL;
    user.phoneNumber = userData.phoneNumber;
    user.userName = userData.displayName;
    user.email = userData.email;
    console.log('this is the user after mapping it', user)
    
    return this._http.post('/api/login-user', user)
      .map(result => {
        return result.json();
      })
  }

  logOut() {
    this.afAuth.auth.signOut();
    this.deleteUserSession();
  }

  setUserSession(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  deleteUserSession() {
    localStorage.removeItem('currentUser');
  }
}
