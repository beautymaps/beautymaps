import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

// class Product {
//   id: number;
//   name: string;
//   suppliers: Supplier;
// }

// class Supplier {
//   id: number;
//   name: string;
//   location: string;
//   products: Product;
// }




export class AppComponent {
  title = 'Supply and Demand';
  
  //Create a model that represents a product obj
  //Create a model that represents a supplier obj
  //Create a list called demand that will hold a set of product objects
  //Create a list called supply that will hold a set of supplier objects
  //Create a function that given a product obj, will return the product and its children
  //Create a function that given a suppliers properties will return the supplier obj
  //Create a function that will add a supplier to the supply's list 
  //Create a function that will add a product to the demand list 


  // product = {
  //   id: null,
  //   name: null,
  //   tagId: null,
  //   suppliers: [
  //       {
  //         id:null, 
  //         name: null, 
  //         location: null,
  //         products: [this.product.tagId]
  //       }
  //   ],
  // }

  // supplier = {
  //   id:null, 
  //   name: null,
  //   location: null,
  //   products: [this.product.tagId]
  // }

  // demand = [
  //   this.product
  // ]

  // supply = [
  //   this.supplier
  // ]
  
  // createProduct(property, value) {
  //   this.product[property] = value;
  //   return this.product
  // }
  // getProduct = function (product) {
  //   this.demand.forEach(item => {
  //     if(item.tagId === product) {
  //       return item;
  //     } else {
  //       return "Item not found";
  //     }
  //   });   
  // }

  // addProduct = function (product) {

  // }

}
