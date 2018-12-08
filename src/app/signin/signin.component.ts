import { Component, OnInit, Inject, Input} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DialogData } from '../class/dialog-data';
import { AuthService } from '../services/auth/auth.service'
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { UserProfile } from '../class/user-profile';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  @Input()
  color: '#fff';
  currentUser: any;
  previousPage;

  constructor(
    // public dialogRef: MatDialogRef<ModalWindowComponent>,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private db: AngularFireDatabase,
    ) {
      // this.userList = this.db.list('/authorizedUser');
      // this.userList.valueChanges().subscribe((users) => {
      //   console.log('this the registered users', users);
      // })
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if(params) {
        this.previousPage = params;
      }
    })
  }

  // externalClick(): void {
  //   this.dialogRef.close();
  // }

  goToSignin() {
    // this.dialogRef.close();
    this.router.navigate(['register']);
  }
  
  goToTerms() {
    // this.dialogRef.close();
    this.router.navigate(['privacy-terms']);
  }

  login() {
    // this.dialogRef.close({auth: true});
    this.router.navigate(['profile'])
  }

  signIn() {
    try { 
      let login = this.authService.doFacebookLogin()
        .then((res) => {
          console.log('is this the login resolve', res)
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          console.log('is there a previous page', this.previousPage);
          if(this.previousPage){
            this.router.navigate([this.previousPage.params]);
          } else {
            this.router.navigate(['profile'])
          }
          // this.dialogRef.close({auth: true, currentUser: this.currentUser});
        },(err) => {
          console.log('there was an error on signin')
        })
    } catch (NullValueException){
      console.log('sorry we couldnt log you in')
    }
  }

 
}