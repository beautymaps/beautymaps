import { Component, OnInit, OnDestroy, EventEmitter, Output} from '@angular/core';
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
  @Output() reload = new EventEmitter();

  authorizedUser: boolean;
  currentUser: any;
  events: string[] = [];
  opened: boolean;
  drawer;
  authSubscription;
  constructor(private authService: AuthService, public dialog: MatDialog, private router: Router, private dataService: DataService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
   this.authSubscription = this.authService.authState.subscribe((auth) => {
    this.authorizedUser = auth;
    console.log('this is the login subscription', auth);

    // if(this.authorizedUser && auth.providerData) this.setCurrentUser();
   })
  }

  ngOnDestroy() {
    if(this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  goToSignin() {
    this.router.navigate(['signin', {params: this.router.url}]);
    // const loginRef = this.dialog.open(ModalWindowComponent, {
    //   width:'400px',
    //   data: {selectedTab: tabType, heading: 'hey girl this worked', subheading: 'i know girl lets work '},
    // })
    // loginRef.afterClosed().subscribe(result => {
    //   this.authorizedUser = result;      
    //   this.currentUser = result.currentUser;
    //   console.log('this is the url', this.router.url)
    //   this.reload.emit();
    // });
  }

  // signIn() {
  //   try { 
  //     let login = this.authService.doFacebookLogin()
  //       login.then((res) => {
  //         console.log('is this the login resolve', res)
  //         this.setCurrentUser();
  //       },(err) => {
  //         console.log('there was an error on signin')
  //       })
  //   } catch (NullValueException){
  //   }
  // }

  setCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('this is the currentUser', this.currentUser);
  }

  logOut() {
    this.authService.logOut();
    this.authorizedUser = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.router.navigate(['home']);
  }

  goToProfile() {
    this.router.navigate(['profile/'+this.currentUser.uid]);
  }

  goToHome() {
    this.router.navigate(['']);
    this.ngOnInit();
  }

  goToMap() {
    this.router.navigate(['home'])
    this.ngOnInit();
  }
}