import { Injectable } from '@angular/core';
import { AngularFireAuth} from "angularfire2/auth";
import { auth } from 'firebase';
import { FirebaseApp } from "angularfire2";
import * as firebase from 'firebase/app';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthService {
  currentUser: any;
  constructor(public afAuth: AngularFireAuth, private af: FirebaseApp) {
    af.auth().onAuthStateChanged((auth)=>{console.log('this the current auth state', auth)})
    afAuth.authState.subscribe((auth)=>{
      console.log('this is the authstate', auth);
      this.currentUser = auth.providerData[0];
    })
    console.log('this is the afauth', this.currentUser);
    
    // authState.subscribe((auth) => {
    //   this.authState = auth;
    // });
   }

  getCurrentUser() {
    this.currentUser;
    console.log('this is the current user :', this.currentUser);
  }

  doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
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

logOut() {
  this.afAuth.auth.signOut();
}

}
