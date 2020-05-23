import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, skip, take } from 'rxjs/operators';
import { Role } from './../../models/role.enum';
import { ProfileService } from './../../services/profile.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessorGuard implements CanActivate {

  constructor(
    private profielService: ProfileService,
    private _router: Router,
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.profielService.user$.getValue();

    if (user) {
      return this._canActivate(user);
    } else {
      return this.profielService.user$.pipe(
        skip(1), take(1),
        map(user => this._canActivate(user)),
      );
    }
  }

  private _canActivate(user): boolean {
    if (user.roles.some(s => s === Role.Professor)) {
      return true;
    } else if (user.roles.some(s => s === Role.Admin)) {
      this._router.navigateByUrl('students');

      return false;
    } else if (user.roles.some(s => s === Role.Student)) {
      this._router.navigateByUrl('instructor');
    }

    return false;
  }

}
