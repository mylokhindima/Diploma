import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, skip, take, filter } from 'rxjs/operators';
import { AuthService } from './../../services/auth.service';
import { ProfileService } from './../../services/profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _profileService: ProfileService,
    private _router: Router,
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this._authService.getToken()) {
      this._router.navigateByUrl('sign-in');
      return false;
    }

    return new Promise((resolve, reject) => {
      this._profileService.user$.pipe(filter(Boolean), take(1)).subscribe(() => resolve(true));
    });
  }

}
