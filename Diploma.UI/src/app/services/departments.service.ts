import { HttpClient } from '@angular/common/http';
import { Department } from './../models/department';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppSettings } from '../core/settings';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(public http: HttpClient) {}

  public getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${AppSettings.host}/departments`);
  }
}
