import { CreateSpecialtyDTO } from './../models/create-specialty.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from './../core/settings';
import { Specialty } from './../models/specialty';

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService {

  constructor(public http: HttpClient) {}

  public getSpecialties(): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(`${AppSettings.host}/specialties`);
  }

  public create(dto: CreateSpecialtyDTO): Observable<Specialty> {
    return this.http.post<Specialty>(`${AppSettings.host}/specialties`, dto);
  }
}
