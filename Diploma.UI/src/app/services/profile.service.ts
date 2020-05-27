import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Diploma } from '../models/diploma';
import { Professor } from '../models/proffesor';
import { Student } from '../models/student';
import { User } from './../models/user';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  public user$: BehaviorSubject<User> = new BehaviorSubject(null);
  public student$: BehaviorSubject<Student> = new BehaviorSubject(null);
  public professor$: BehaviorSubject<Professor> = new BehaviorSubject(null);
  public diploma$: BehaviorSubject<Diploma> = new BehaviorSubject(null);

}
