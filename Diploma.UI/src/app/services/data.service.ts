import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Role } from '../models/role.enum';
import { ProfileService } from '../services/profile.service';
import { DiplomasService } from './diplomas.service';
import { ProfessorsService } from './professors.service';
import { StudentsService } from './students.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private _profileService: ProfileService,
    private _userService: UsersService,
    private _studentsService: StudentsService,
    private _professorsService: ProfessorsService,
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
        } else if (user.roles.includes(Role.Professor)) {
          return this._professorsService.getProfessor(user.id).pipe(
            tap(p => {
              this._profileService.user$.next(user);
              this._profileService.professor$.next(p);
            })
          );
        } else {
          this._profileService.user$.next(user);
        }
        return of(null);
      })
    );
  }
}
