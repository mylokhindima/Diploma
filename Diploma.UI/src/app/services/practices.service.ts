import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Practice } from '../models/practice';
import { AppSettings } from '../core/settings';
import { convertToHttpParams } from '../core/utils/http-params.converter';
import { SearchPracticesDTO } from '../models/search-practices.dto';

@Injectable({
  providedIn: 'root'
})
export class PracticesService {

  constructor(public http: HttpClient) {}

  public getPractices(): Observable<Practice[]> {
    return this.http.get<Practice[]>(`${AppSettings.host}/practices`);
  }

  public getPractice(id: string): Observable<Practice> {
    return this.http.get<Practice>(`${AppSettings.host}/practices/${id}`);
  }

  public filter(query: SearchPracticesDTO): Observable<Practice[]> {
    const params = convertToHttpParams(query);

    return this.http.get<Practice[]>(`${AppSettings.host}/practices/filter`, {
      params
    });
  }

  public getStudentPractice(studentId: string): Observable<Practice> {
    return this.http.get<Practice>(`${AppSettings.host}/practices/student/${studentId}`);
  }

  public uploadPracticeReport(id: string, file: any): Observable<Practice> {
    return this.http.put<Practice>(`${AppSettings.host}/practices/${id}/upload`, file);
  }

  public examine(id: string, score: number): Observable<Practice> {
    return this.http.put<Practice>(`${AppSettings.host}/practices/${id}/examine`, {
      score,
    });
  }

  public updateMany(practices: Practice[]): Observable<Practice[]> {
    return this.http.put<Practice[]>(`${AppSettings.host}/practices/update/many`, practices);
  }
}
