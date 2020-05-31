import { Stage } from './../models/stage';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../core/settings';

@Injectable({
  providedIn: 'root'
})
export class StagesService {

  constructor(public http: HttpClient) {
  }

  public getStages(): Observable<Stage[]> {
    return this.http.get<Stage[]>(`${AppSettings.host}/stages`);
  }

  public updateMany(dtos: Stage[]): Observable<Stage[]> {
    return this.http.put<Stage[]>(`${AppSettings.host}/stages/many`, dtos);
  }
}
