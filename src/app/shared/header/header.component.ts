import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ModalWindowComponent } from '../modal-window/modal-window.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  authorizedUser: boolean;
  currentUser: any;
  events: string[] = [];
  opened: boolean;

  constructor(private authService: AuthService, public dialog: MatDialog, private router: Router, private dataService: DataService) { }

  ngOnInit() {
   this.authService.authState.subscribe((auth) => {
    this.authorizedUser = auth ? true : false;
    if(this.authorizedUser && auth.providerData) this.setCurrentUser(auth);
   })
  }

  startSignIn(tabType) {
    const loginRef = this.dialog.open(ModalWindowComponent, {
      width:'400px',
      data: {selectedTab: tabType, heading: 'hey girl this worked', subheading: 'i know girl lets work '},
    })
    loginRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.authorizedUser = result;      
    });
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
    this.authorizedUser = false;
    console.log('this is a logged out user', this.authService.getCurrentUser())
  }

  goToProfile() {
    console.log('can we get the id', this.currentUser)
    this.router.navigate(['profile/'+this.currentUser.uid])
  }
}