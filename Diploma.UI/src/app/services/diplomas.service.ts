import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Diploma } from '../models/diploma';
import { AppSettings } from '../core/settings';
import { convertToHttpParams } from '../core/utils/http-params.converter';
import { DiplomaReport } from '../models/diploma-report';

interface SearchDiplomasQuery {
  studentId: string;
}

@Injectable({
  providedIn: 'root'
})
export class DiplomasService {

  constructor(public http: HttpClient) {}

  public filterDiplomas(query: SearchDiplomasQuery): Observable<Diploma[]> {
    const params = convertToHttpParams(query);

    return this.http.get<Diploma[]>(`${AppSettings.host}/diplomas/filter`, {
      params
    });
  }

  public findDiplomaReports(id: string): Observable<DiplomaReport[]> {
    return this.http.get<DiplomaReport[]>(`${AppSettings.host}/diplomas/${id}/reports`);
  }

  public uploadReport(diplomaId: string, file: FormData): Observable<DiplomaReport> {
    file.append('id', diplomaId);
    return this.http.post<DiplomaReport>(`${AppSettings.host}/diplomas/reports`, file);
  }
}
