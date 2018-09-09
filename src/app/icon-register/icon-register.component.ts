
import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-icon-register',
  templateUrl: './icon-register.component.html',
  styleUrls: ['./icon-register.component.scss']
})
export class IconRegisterComponent {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'facebook',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icon/facebook2.svg'));
  }
}