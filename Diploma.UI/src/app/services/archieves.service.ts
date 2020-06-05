import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from './../core/settings';
import { Archieve } from './../models/archieve';

@Injectable({
  providedIn: 'root'
})
export class ArchievesService {

  constructor(
    private http: HttpClient,
  ) {}

  public getAll(): Observable<Archieve[]> {
    return this.http.get<Archieve[]>(`${AppSettings.host}/archives`);
  }

  public getArchieveByDiplomaId(id: string): Observable<Archieve> {
    return this.http.get<Archieve>(`${AppSettings.host}/archives/${id}`);
  }

  public uploadReport(dto: FormData): Observable<Archieve> {
    return this.http.post<Archieve>(`${AppSettings.host}/archives/files`, dto);
  }

  public generate(id: string, name: string): void {
    this.http.get(`${AppSettings.host}/archives/${id}/generate`, {
      responseType: 'arraybuffer',
    }).subscribe(res => {
      saveAs(new Blob([res]), `${name}.zip`);
    });
  }
}
