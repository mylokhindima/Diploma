import { SearchFileDTO } from './../models/search-file.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../core/settings';
import { File } from '../models/file';
import { convertToHttpParams } from '../core/utils/http-params.converter';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(public http: HttpClient) {}

  public create(dto: FormData): Observable<File> {
    return this.http.post<File>(`${AppSettings.host}/files`, dto);
  }

  public filter(query: SearchFileDTO): Observable<File[]> {
    const params = convertToHttpParams(query);

    return this.http.get<File[]>(`${AppSettings.host}/files/filter`, {
      params,
    });
  }

  public remove(id: string): Observable<void> {
    return this.http.delete<void>(`${AppSettings.host}/files/${id}`);
  }
}
