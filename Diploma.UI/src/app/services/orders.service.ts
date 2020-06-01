import { Injectable } from '@angular/core';
import { AppSettings } from '../core/settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateOrderDTO } from '../models/create-order.dto';
import { convertToHttpParams } from '../core/utils/http-params.converter';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(public http: HttpClient) {}

  public create(dto: CreateOrderDTO): Observable<Order> {
    return this.http.post<Order>(`${AppSettings.host}/orders`, dto);
  }

  public remove(id: string): Observable<void> {
    return this.http.delete<void>(`${AppSettings.host}/orders/${id}`);
  }

  public findByFileId(id: string): Observable<Order> {
    return this.http.get<Order>(`${AppSettings.host}/orders/file/${id}`);
  }

  public approve(id: string): Observable<Order> {
    return this.http.put<Order>(`${AppSettings.host}/orders/${id}/approve`, {});
  }

  public filter(departmentId: string): Observable<Order[]> {
    const params = convertToHttpParams({
      departmentId
    });

    return this.http.get<Order[]>(`${AppSettings.host}/orders/filter`, {
      params,
    });
  }
}
