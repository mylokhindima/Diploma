import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../core/settings';
import { convertToHttpParams } from '../core/utils/http-params.converter';
import { CreateDiplomaInstructorThemeRequestDTO } from '../models/create-diploma-instructor-theme-request.dto';
import { DiplomaInstructorThemeRequest } from '../models/diploma-instructor-theme-request';
import { SearchRequestsQuery } from '../models/search-requests-query';

@Injectable({
  providedIn: 'root'
})
export class DiplomaInstructorThemeRequestService {

  constructor(public http: HttpClient) { }

  public createRequest(request: CreateDiplomaInstructorThemeRequestDTO): Observable<DiplomaInstructorThemeRequest> {
    return this.http.post<DiplomaInstructorThemeRequest>(`${AppSettings.host}/diplomaInstructorThemeRequests`, request);
  }

  public acceptRequestByProfessor(requestId: string): Observable<void> {
    return this.http.post<void>(`${AppSettings.host}/diplomaInstructorThemeRequests/professor/accept`, {
      requestId,
    });
  }

  public declineRequestByProfessor(requestId: string, comment: string): Observable<void> {
    return this.http.post<void>(`${AppSettings.host}/diplomaInstructorThemeRequests/professor/decline`, {
      requestId,
      comment
    });
  }

  public acceptRequestByMethodologicalCommitee(requestId: string): Observable<void> {
    return this.http.post<void>(`${AppSettings.host}/diplomaInstructorThemeRequests/commission/accept`, {
      requestId,
    });
  }

  public declineRequestByMethodologicalCommitee(requestId: string, comment: string): Observable<void> {
    return this.http.post<void>(`${AppSettings.host}/diplomaInstructorThemeRequests/commission/decline`, {
      requestId,
      comment
    });
  }

  public filterRequests(query: SearchRequestsQuery): Observable<DiplomaInstructorThemeRequest[]> {
    const params = convertToHttpParams(query);

    return this.http.get<DiplomaInstructorThemeRequest[]>(`${AppSettings.host}/diplomaInstructorThemeRequests/filter`, {
      params,
    });
  }
}
