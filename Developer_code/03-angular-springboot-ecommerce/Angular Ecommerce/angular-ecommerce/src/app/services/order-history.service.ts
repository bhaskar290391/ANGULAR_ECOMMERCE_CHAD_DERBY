import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from '../commons/order';
import { OrderHistory } from '../commons/order-history';
import { environment } from 'src/environments/environment.qa';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  constructor(private httpClient:HttpClient) { }

  orderHistory(email:String):Observable<OrderHistory[]>{
    const baseUrl=environment.baseUrl+"/api/orders/search/findByCustomerEmailOrderByCreatedDate?email="+email;
    return this.httpClient.get<GetOrderHistoryResponses>(baseUrl).pipe(
      map(response => response._embedded.orders)
    );
  }
}

export interface GetOrderHistoryResponses{
  _embedded:{
    orders:OrderHistory[]
  }
}