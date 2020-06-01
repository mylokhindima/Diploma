import { CreateTimeSectionDTO } from './../models/create-time-section.dto';
import { DiplomaProtection } from './../models/diploma-protection';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../core/settings';
import { TimeSection } from '../models/time-section';
import { convertToHttpParams } from '../core/utils/http-params.converter';

@Injectable({
  providedIn: 'root'
})
export class DiplomaProtectionsService {

  constructor(public http: HttpClient) { }

  public findProtectionsByEducationalProgram(educationalProgramId: string): Observable<DiplomaProtection[]> {
    return this.http.get<DiplomaProtection[]>(`${AppSettings.host}/diplomaProtections/educationalProgram/${educationalProgramId}`);
  }

  public findSections(): Observable<TimeSection[]> {
    return this.http.get<TimeSection[]>(`${AppSettings.host}/diplomaProtections/timesections`);
  }

  public filterSections(studentId: string): Observable<TimeSection> {
    const params = convertToHttpParams({
      studentId,
    });

    return this.http.get<TimeSection>(`${AppSettings.host}/diplomaProtections/timesections/filter`, {
      params
    });
  }

  public createSection(dto: CreateTimeSectionDTO): Observable<TimeSection> {
    return this.http.post<TimeSection>(`${AppSettings.host}/diplomaProtections/timesections`, dto);
  }

  public record(sectionId: string, studentId: string): Observable<TimeSection> {
    return this.http.post<TimeSection>(`${AppSettings.host}/diplomaProtections/record`, {
      sectionId,
      studentId,
    });
  }

  public create(protection: DiplomaProtection): Observable<DiplomaProtection> {
    return this.http.post<DiplomaProtection>(`${AppSettings.host}/diplomaProtections`, protection)
  }

  public getDiplomaProtections(): Observable<DiplomaProtection[]> {
    return this.http.get<DiplomaProtection[]>(`${AppSettings.host}/diplomaProtections`);
  }
}
