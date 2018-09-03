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

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  startSignIn() {
    // const loginRef = this.dialog.open(DialogOverviewExampleDialog, {
    //   width:'100%'
    // })
  }
  signIn() {
    try { 
      let login = this.authService.doFacebookLogin()
      this.setCurrentUser();
    } catch (NullValueException){
      console.log('sorry we couldnt log you in')
    }
  }
  setCurrentUser() {
    this.authService.getCurrentUser();
    console.log('we are ready to set the current user')
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