import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from './../core/settings';
import { User } from './../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(
    public http: HttpClient,
  ) {

  }

  public deactivate(id: string): Observable<void> {
    return this.http.put<void>(`${AppSettings.host}/users/deactivate/${id}`, {});
  }

  public getMe(): Observable<User> {
    return this.http.get<User>(`${AppSettings.host}/users/me`);
  }
}
