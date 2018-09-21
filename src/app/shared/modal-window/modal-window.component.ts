import { Component, OnInit, Inject, Input} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DialogData } from '../../class/dialog-data';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {
  @Input()
  color: '#fff';
  
  constructor(
    public dialogRef: MatDialogRef<ModalWindowComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
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
}
