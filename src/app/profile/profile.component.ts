import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  productListView = true;

  constructor() { }

  ngOnInit() {
  }

  addProduct () {
    this.productListView = false;
  }
}
