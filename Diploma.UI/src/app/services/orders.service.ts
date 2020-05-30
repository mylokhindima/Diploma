import { Injectable } from '@angular/core';
import { AppSettings } from '../core/settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateOrderDTO } from '../models/create-order.dto';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(public http: HttpClient) {}

  public create(dto: CreateOrderDTO): Observable<any> {
    return this.http.post<any>(`${AppSettings.host}/orders`, dto);
  }

  public remove(id: string): Observable<void> {
    return this.http.delete<void>(`${AppSettings.host}/orders/${id}`);
  }

  public findByFileId(id: string): Observable<any> {
    return this.http.get<void>(`${AppSettings.host}/orders/file/${id}`);
  }
}
