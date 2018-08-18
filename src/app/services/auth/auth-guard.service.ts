import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(public router: Router) { }

  canActivate() {
    console.log('i am checking to see if you are logged in');
    return true;
  }

  canActivateChild() {
    console.log('checking child route access');
    return true;
  }

}
