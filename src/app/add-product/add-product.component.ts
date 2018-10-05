import { Component, OnInit, Inject, Input, EventEmitter, Output} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DialogData } from '../class/dialog-data';

// export interface Food {
//   value: string;
//   viewValue: string;
// }

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  @Output() doneAddingProduct = new EventEmitter();
  categories = [
    "Wigs", "Natural Hair", "Protective Styling"
  ];

  brandList = [
    "Mane Choice", "Shea Moisture", "Janet Collection", "Other"
  ]
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  cancel() {
    this.doneAddingProduct.emit({update: false})
  }

  done() {
    this.doneAddingProduct.emit({update: false})
  }

}
