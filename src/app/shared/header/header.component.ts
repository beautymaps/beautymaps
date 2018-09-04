import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  authorizedUser: boolean;
  currentUser: any;

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
   this.authService.authState.subscribe((auth) => {
    this.authorizedUser = auth ? true : false;
    if(this.authorizedUser && auth.providerData) this.setCurrentUser(auth);
   })
  }

  startSignIn() {
    // const loginRef = this.dialog.open(DialogOverviewExampleDialog, {
    //   width:'100%'
    // })
  }
  signIn() {
    try { 
      let login = this.authService.doFacebookLogin()
    } catch (NullValueException){
      console.log('sorry we couldnt log you in')
    }
  }
  setCurrentUser(user) {
    this.currentUser = user.providerData[0];
    console.log('we are ready to set the current user', this.currentUser)
  }

  logOut() {
    this.authService.logOut();
    console.log('this is a logged out user', this.authService.getCurrentUser())
  }
}

// @Component({
//   selector: 'dialog-overview-example-dialog',
// })
// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//   ) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }