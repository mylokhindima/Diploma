import { AppSettings } from './../core/settings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArchievesService {

  constructor(
    private http: HttpClient,
  ) {
    this.generate();
  }

  public generate(): void {
    this.http.get(`${AppSettings.host}/archives/5eb9a6004d1c7217608637ad`, {
      responseType: 'arraybuffer',
    }).subscribe(res => {
      saveAs(new Blob([res]), 'test.zip');
    });
  }
}
