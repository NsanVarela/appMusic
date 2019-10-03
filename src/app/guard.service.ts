import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any | boolean {
      // console.log(`authState : `, this.authS.authState);
      return new Promise(
        (resolve, reject) => {
          firebase.auth().onAuthStateChanged(
            (user) => {
              if (user) {
                resolve(true);
              } else {
                this.router.navigate(['/login', 'signin']);
                resolve(false);
              }
            }
          );
        }
      );
  }
}


