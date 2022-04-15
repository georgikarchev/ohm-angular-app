import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.isUserLoggedIn(this.authService)) {
      return true;
    }

    return this.router.createUrlTree(['/home']);
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.isUserLoggedIn(this.authService)) {
      return true;
    }
    
    return this.router.createUrlTree(['/home']);
  }

  isUserLoggedIn(authService: AuthService): boolean {
    console.log(authService.currentUserUid);
    if(authService.currentUserUid) {
      return true;
    }
    return false;
  }

}
