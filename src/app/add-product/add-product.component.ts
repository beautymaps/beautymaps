import { Component, OnInit, Inject, Input} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DialogData } from '../class/dialog-data';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

}
