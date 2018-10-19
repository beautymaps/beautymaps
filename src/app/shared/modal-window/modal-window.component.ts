import { Component, OnInit, Inject, Input} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DialogData } from '../../class/dialog-data';
import { AuthService } from '../../services/auth/auth.service'
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { UserProfile } from '../../class/userProfile';


@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {
  @Input()
  color: '#fff';
  selectedTab: boolean;
  authorizedUser: boolean;
  currentUser: any;
  user = new UserProfile();
  userList: any;
  constructor(
    public dialogRef: MatDialogRef<ModalWindowComponent>,
    private router: Router,
    private authService: AuthService,
    private db: AngularFireDatabase,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.userList = this.db.list('/authorizedUser');
      this.userList.valueChanges().subscribe((users) => {
        console.log('this the registered users', users);
      })
    }

  ngOnInit() {
    console.log('this is the data from dialog', this.data) 
    this.selectedTab = this.data.selectedTab;

    this.authService.authState.subscribe((auth) => {
      this.authorizedUser = auth ? true : false;
      if(this.authorizedUser && auth.providerData) this.setCurrentUser(auth);
     })
  }

  externalClick(): void {
    this.dialogRef.close();
  }

  goToSignin() {
    this.dialogRef.close();
    this.router.navigate(['register']);
  }
  
  goToTerms() {
    this.dialogRef.close();
    this.router.navigate(['privacy-terms']);
  }

  login() {
    this.dialogRef.close({auth: true});
  }

  authorizeUser () {
    
  }
  signIn() {
    try { 
      let login = this.authService.doFacebookLogin()
      login.then(function(res) {
      })
      this.dialogRef.close({auth:true})
    } catch (NullValueException){
      console.log('sorry we couldnt log you in')
    }
  }

  setCurrentUser(user) {
    this.currentUser = user.providerData[0];
    this.user.uid = user.uid;
    this.user.username = user.displayName;
    this.user.profileImage = user.photoURL;
    this.user.email = user.email;
    this.user.phoneNumber = user.phoneNumber;
    this.user.provider = user.providerId;
    this.userList.push(this.user);
    console.log('we are ready to set the current user', this.currentUser)
  }
}
