import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Practice } from '../models/practice';
import { AppSettings } from '../core/settings';
import { convertToHttpParams } from '../core/utils/http-params.converter';

@Injectable({
  providedIn: 'root'
})
export class PracticesService {

  constructor(public http: HttpClient) {}

  public getStudentPractice(studentId: string): Observable<Practice> {
    const params = convertToHttpParams({
      studentId,
    });

    return this.http.get<Practice>(`${AppSettings.host}/practices`, {
      params
    });
  }

  public uploadPracticeReport(id: string, file: any): Observable<Practice> {
    return this.http.put<Practice>(`${AppSettings.host}/practices/${id}/upload`, file);
  }
}
