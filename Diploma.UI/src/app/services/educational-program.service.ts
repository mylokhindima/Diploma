import { CreateEducationalProgramDTO } from './../models/create-educational-program';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../core/settings';
import { EducationalProgram } from './../models/educational-program';
import { SearchEducationalProgramQuery } from '../models/search-educational-program-query';
import { convertToHttpParams } from '../core/utils/http-params.converter';

@Injectable({
  providedIn: 'root'
})
export class EducationalProgramService {

  constructor(public http: HttpClient) {}

  public getPrograms(): Observable<EducationalProgram[]> {
    return this.http.get<EducationalProgram[]>(`${AppSettings.host}/educationalPrograms`);
  }

  public filter(query: SearchEducationalProgramQuery): Observable<EducationalProgram[]> {
    const params = convertToHttpParams(query);

    return this.http.get<EducationalProgram[]>(`${AppSettings.host}/educationalPrograms/filter`, {
      params
    });
  }

  public create(dto: CreateEducationalProgramDTO): Observable<EducationalProgram> {
    return this.http.post<EducationalProgram>(`${AppSettings.host}/educationalPrograms`, dto);
  }
}
