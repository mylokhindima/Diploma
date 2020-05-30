import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../core/settings';
import { CreateStudentDTO } from './../models/create-student.dto';
import { Student } from './../models/student';
import { SearchStudentsDTO } from '../models/search-students.dto';
import { convertToHttpParams } from '../core/utils/http-params.converter';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  constructor(public http: HttpClient) {
  }

  public getStudent(id: string): Observable<Student> {
    return this.http.get<Student>(`${AppSettings.host}/students/${id}`);
  }

  public getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${AppSettings.host}/students`);
  }

  public create(dto: CreateStudentDTO): Observable<Student> {
    return this.http.post<Student>(`${AppSettings.host}/students`, dto);
  }

  public upload(file: FormData): Observable<Student[]> {
    return this.http.post<Student[]>(`${AppSettings.host}/students/upload`, file);
  }

  public filter(query: SearchStudentsDTO): Observable<Student[]> {
    const params = convertToHttpParams(query);

    return this.http.get<Student[]>(`${AppSettings.host}/students/filter`, {
      params,
    });
  }
}
