import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  categories:any [];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToMapView () {
    this.router.navigate(['/home'], {skipLocationChange: false});
  }

  searchDatabase() {
    if(this.categories) {
      console.log('these are the categories', this.categories);
    } else {
      this.router.navigate(['/create_demand', {skipLocationChange: false}])
    }
  }
}
