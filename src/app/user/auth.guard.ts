import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AppService} from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
      private router: Router,
      private appService: AppService

  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }


    console.log('direct login');
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
