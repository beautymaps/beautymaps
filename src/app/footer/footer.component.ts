import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserProfile } from '../class/user-profile';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentUser: UserProfile;
  constructor(
    private router: Router
  ) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    }

  ngOnInit() {
  }
  isHomeSelected = false;
  goToHome() {
      this.isHomeSelected = true;
      this.router.navigate(['home']);
  }
  
  isProfileSelected = false;
  goToProfile() {
    this.isProfileSelected = true;
    if(this.currentUser){
      this.router.navigate(['profile/'+this.currentUser.uid]);
    } else {
      this.router.navigate(['signin', {params:'/profile/'+this.currentUser.uid}]);
    } 
  }

  isMessagesSelected = false;
  goToMessages() {
    this.isMessagesSelected = true;
    if(this.currentUser){
      this.router.navigate(['messages']);
    } else {
      this.router.navigate(['signin', {params: '/messages'}]);
    } 
  }

  ismoreSelected = false;
  goToMore() {
    this.ismoreSelected = true;
    return true
  }  

}
