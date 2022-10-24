import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanLoad {
  constructor(public router: Router,
    public loginService: LoginService){

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = localStorage.getItem('id_token');
      if (this.loginService.isLoggedIn()) {
        return true;
      }
      return this.router.parseUrl('/login');
  }
}
