import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements OnInit {
  @Input () ctaText: string;
  @Input () size: string;

  constructor() { }

  ngOnInit() {
  }
  
}
