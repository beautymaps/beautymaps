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

  goToHome() {
    this.router.navigate(['home']);
  }

  goToProfile() {
    if(this.currentUser){
      this.router.navigate(['profile/'+this.currentUser.uid]);
    } else {
      this.router.navigate(['signin', {params:'/profile/'+this.currentUser.uid}]);
    } 
  }

  goToMessages() {
    if(this.currentUser){
      this.router.navigate(['messages']);
    } else {
      this.router.navigate(['signin', {params: '/messages'}]);
    } 
  }
}
