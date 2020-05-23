import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { AppSettings } from '../core/settings';

@Injectable({
  providedIn: 'root'
})
export class StaticService {

  public host = AppSettings.host;

  constructor(
    private _http: HttpClient,
  ) { }

  public download(path: string, filename: string): void {
    this._http.get(`${this.host}/static/${path}`, {
      responseType: 'arraybuffer',
    }).subscribe(res => {
      saveAs(new Blob([res]), filename);
    });
  }
}
