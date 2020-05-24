import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Diploma } from '../models/diploma';
import { AppSettings } from '../core/settings';
import { convertToHttpParams } from '../core/utils/http-params.converter';
import { DiplomaReport } from '../models/diploma-report';

interface SearchDiplomasQuery {
  studentId?: string;
  instructorId?: string;
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

  public find(id: string): Observable<Diploma> {
    return this.http.get<Diploma>(`${AppSettings.host}/diplomas/${id}`);
  }

  public findDiplomaReports(id: string): Observable<DiplomaReport[]> {
    return this.http.get<DiplomaReport[]>(`${AppSettings.host}/diplomas/${id}/reports`);
  }

  public createComment(reportId: string, comment: string): Observable<DiplomaReport> {
    return this.http.post<DiplomaReport>(`${AppSettings.host}/diplomas/reports/comments`, {
      reportId,
      comment,
    });
  }

  public uploadReport(diplomaId: string, file: FormData): Observable<DiplomaReport> {
    file.append('id', diplomaId);
    return this.http.post<DiplomaReport>(`${AppSettings.host}/diplomas/reports`, file);
  }
}
