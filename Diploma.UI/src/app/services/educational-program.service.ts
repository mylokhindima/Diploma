import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../core/settings';
import { EducationalProgram } from './../models/educational-program';

@Injectable({
  providedIn: 'root'
})
export class EducationalProgramService {

  constructor(public http: HttpClient) {}

  public getPrograms(): Observable<EducationalProgram[]> {
    return this.http.get<EducationalProgram[]>(`${AppSettings.host}/educationalPrograms`);
  }
}
