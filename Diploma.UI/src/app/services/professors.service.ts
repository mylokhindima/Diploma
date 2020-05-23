import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../core/settings';
import { CreateProfessorDTO } from './../models/create-professor.dto';
import { Professor } from './../models/proffesor';
import { ProfessorQuery } from '../models/professor.query';
import { convertToHttpParams } from '../core/utils/http-params.converter';

@Injectable({
  providedIn: 'root'
})
export class ProfessorsService {

  constructor(public http: HttpClient) {}

  public getProfessors(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${AppSettings.host}/professors`);
  }

  public filterByQuery(query: ProfessorQuery): Observable<Professor[]> {
    const params = convertToHttpParams(query);

    return this.http.get<Professor[]>(`${AppSettings.host}/professors/filter`, {
      params,
    });
  }


  public create(dto: CreateProfessorDTO): Observable<Professor> {
    return this.http.post<Professor>(`${AppSettings.host}/professors`, dto);
  }

  public upload(file: FormData): Observable<Professor[]> {
    return this.http.post<Professor[]>(`${AppSettings.host}/professors/upload`, file);
  }
}
