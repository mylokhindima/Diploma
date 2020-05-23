import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './../models/user';
import { Student } from '../models/student';
import { Diploma } from '../models/diploma';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  public user$: BehaviorSubject<User> = new BehaviorSubject(null);
  public student$: BehaviorSubject<Student> = new BehaviorSubject(null);
  public diploma$: BehaviorSubject<Diploma> = new BehaviorSubject(null);

}
