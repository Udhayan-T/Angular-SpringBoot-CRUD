import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RouterService } from './services/router.service';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(
    private router: Router, 
    private routerservice: RouterService,
    private authservice: AuthenticationService
  ) { }

  canActivate() {
    const bearerToken = localStorage.getItem('bearerToken');

    if (bearerToken != null) {
      if(this.authservice.isTokenExpired()) {
        return true;
      }
  }
  else {
    this.routerservice.routeToLogin();
    return false;
  }
}
  

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {

  //   const bearerToken = localStorage.getItem('bearerToken');

  //   if (bearerToken != null) {
  //       console.log("within can activate if condition start "+bearerToken);
  //     const authStatus = this.authservice.isUserAuthenticated(bearerToken).then(
  //       (data) => {
  //         console.log("within can activate authStatus-> "+authStatus);
  //         console.log(data);
  //         return data;
  //       },
  //       (err) => {
  //         console.log(authStatus+" - authStatus - within can activate if condition err() "+bearerToken);
  //         console.log(err);
  //       });

  //     if (authStatus) {
  //       return true;
  //     }
  //   }
  //   else {
  //     console.log("Within can activate else condition");
  //     this.routerservice.routeToLogin();
  //     return false;
  //   }
  // }
}