import { DiplomaProtection } from './../models/diploma-protection';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../core/settings';

@Injectable({
  providedIn: 'root'
})
export class DiplomaProtectionsService {

  constructor(public http: HttpClient) { }

  public findProtectionsByEducationalProgram(educationalProgramId: string): Observable<DiplomaProtection[]> {
    return this.http.get<DiplomaProtection[]>(`${AppSettings.host}/diplomaProtections/educationalProgram/${educationalProgramId}`);
  }
}
