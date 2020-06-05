import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../core/settings';
import { convertToHttpParams } from '../core/utils/http-params.converter';
import { Diploma } from '../models/diploma';
import { SearchDiplomaReports } from '../models/search-diploma-reports.dto';
import { DiplomaReport } from './../models/diploma-report';

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

  public filterMainReports(query: SearchDiplomaReports): Observable<DiplomaReport[]> {
    const params = convertToHttpParams(query);

    return this.http.get<DiplomaReport[]>(`${AppSettings.host}/diplomas/reports/main/filter`, {
      params
    });
  }

  public updateMany(dtos: any): Observable<Diploma[]> {
    return this.http.put<Diploma[]>(`${AppSettings.host}/diplomas`, dtos);
  }

  public find(id: string): Observable<Diploma> {
    return this.http.get<Diploma>(`${AppSettings.host}/diplomas/${id}`);
  }

  public findDiplomaReports(id: string): Observable<DiplomaReport[]> {
    return this.http.get<DiplomaReport[]>(`${AppSettings.host}/diplomas/${id}/reports`);
  }

  public findDiplomaReport(id: string): Observable<DiplomaReport> {
    return this.http.get<DiplomaReport>(`${AppSettings.host}/diplomas/reports/${id}`);
  }

  public createComment(reportId: string, comment: string): Observable<DiplomaReport> {
    return this.http.post<DiplomaReport>(`${AppSettings.host}/diplomas/reports/comments`, {
      reportId,
      comment,
    });
  }

  public uploadMainReport(diplomaId: string, file: FormData): Observable<DiplomaReport> {
    file.append('id', diplomaId);
    return this.http.post<DiplomaReport>(`${AppSettings.host}/diplomas/reports/main`, file);
  }

  public uploadReport(diplomaId: string, file: FormData): Observable<DiplomaReport> {
    file.append('id', diplomaId);
    return this.http.post<DiplomaReport>(`${AppSettings.host}/diplomas/reports`, file);
  }

  public acceptByInstructor(diplomaId: string): Observable<void> {
    return this.http.put<void>(`${AppSettings.host}/diplomas/${diplomaId}/instructor/accept`, {});
  }

  public passPlagiarism(diplomaId: string): Observable<void> {
    return this.http.put<void>(`${AppSettings.host}/diplomas/${diplomaId}/plagiarism/accept`, {});
  }

  public failPlagiarism(diplomaId: string): Observable<void> {
    return this.http.put<void>(`${AppSettings.host}/diplomas/${diplomaId}/plagiarism/decline`, {});
  }

  public passNormscontrol(diplomaId: string): Observable<void> {
    return this.http.put<void>(`${AppSettings.host}/diplomas/${diplomaId}/normscontrol/accept`, {});
  }
}
