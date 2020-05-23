import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../core/settings';
import { CreateDiplomaInstructorRequestDTO } from './../models/create-diploma-instructor-request.dto';
import { DiplomaInstructorRequest } from './../models/diploma-instructor-request';
import { SearchRequestsQuery } from './../models/search-requests-query';
import { convertToHttpParams } from '../core/utils/http-params.converter';

@Injectable({
  providedIn: 'root'
})
export class DiplomaInstructorRequestService {

  constructor(public http: HttpClient) { }

  public createRequest(request: CreateDiplomaInstructorRequestDTO): Observable<DiplomaInstructorRequest> {
    return this.http.post<DiplomaInstructorRequest>(`${AppSettings.host}/diplomaInstructorRequests`, request);
  }

  public acceptRequest(requestId: string): Observable<void> {
    return this.http.post<void>(`${AppSettings.host}/diplomaInstructorRequests/accept`, {
      requestId,
    });
  }

  public declineRequest(requestId: string, comment: string): Observable<void> {
    return this.http.post<void>(`${AppSettings.host}/diplomaInstructorRequests/decline`, {
      requestId,
      comment
    });
  }

  public filterRequests(query: SearchRequestsQuery): Observable<DiplomaInstructorRequest[]> {
    const params = convertToHttpParams(query);

    return this.http.get<DiplomaInstructorRequest[]>(`${AppSettings.host}/diplomaInstructorRequests/filter`, {
      params,
    });
  }
}
