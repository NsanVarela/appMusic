import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private authS: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any | boolean {
      console.log(`authState : `, this.authS.authState);

      // tslint:disable-next-line: curly
      if (this.authS.authState) return true;

      this.router.navigate([`/login`]);
      return false;
  }
}


