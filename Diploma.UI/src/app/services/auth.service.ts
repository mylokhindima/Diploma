import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { LoginDTO } from '../models/login.dto';
import { ProfileService } from '../services/profile.service';
import { AppSettings } from './../core/settings';
import { TokenResponse } from './../models/token.response';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(public http: HttpClient, private dataService: DataService, private _profileService: ProfileService) {
  }

  public getToken(): string {
    return localStorage.getItem('authToken');
  }

  public signIn(dto: LoginDTO): Observable<void> {
    return this.http.post<TokenResponse>(`${AppSettings.host}/auth/login`, dto).pipe(
      tap(res => this.saveToken(res.access_token)),
      switchMap(() => this.dataService.loadMyInfo()),
    );
  }

  public saveToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  public logout() {
    localStorage.removeItem('authToken');

    this._profileService.student$.next(null);
    this._profileService.user$.next(null);
  }
}
