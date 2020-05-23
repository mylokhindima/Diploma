import { DiplomasService } from './diplomas.service';
import { StudentsService } from './students.service';
import { tap, switchMap, map } from 'rxjs/operators';
import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { ProfileService } from '../services/profile.service';
import { Role } from '../models/role.enum';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private _profileService: ProfileService,
    private _userService: UsersService,
    private _studentsService: StudentsService,
    private _diplomasService: DiplomasService,
  ) { }

  public loadMyInfo(): Observable<any> {
    return this._userService.getMe().pipe(
      switchMap(user => {
        if (user.roles.includes(Role.Student)) {
          const getStudent$ = this._studentsService.getStudent(user.id);
          const getDiploma$ = this._diplomasService.filterDiplomas({
            studentId: user.id,
          }).pipe(map(diplomas => diplomas[0]));

          return forkJoin([getStudent$, getDiploma$]).pipe(
            tap(([student, diploma]) => {
              this._profileService.user$.next(user);
              this._profileService.student$.next(student);
              this._profileService.diploma$.next(diploma);
            }));
        } else {
          this._profileService.user$.next(user);
        }
        return of(null);
      })
    );
  }
}
