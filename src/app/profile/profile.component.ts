import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  product = {
    image: '../../../assets/img/imgicon.png',
    name: "Voluminous Shampoo", 
    brand: "Creme of Nature",
    description: "This shampoo will give your hair so much volume and drama you won\'t even believe it.",
    keywords: "Natural Hair, Wash Day"
  }
  productListView = true;
  products = []

  constructor() { }

  ngOnInit() {
  }

  addProduct () {
    this.productListView = false;
  }

  doneAdding (ev) {
    console.log('what is the eve', ev)
    if(ev.update) {
      this.productListView = !this.productListView;

    } else {
      this.productListView = !this.productListView;
      this.products.push(this.product);
      console.log('what happens to the products list:', this.products);
    }
  }
}
