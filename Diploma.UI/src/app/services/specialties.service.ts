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
}
