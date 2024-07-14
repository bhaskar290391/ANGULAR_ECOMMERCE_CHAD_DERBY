import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../commons/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl="http://localhost:8080/api/products";

  constructor(private httpClient:HttpClient) { }

  getProductList():Observable<Product[]>{
    return this.httpClient.get<GetProductResponse>(this.baseUrl).pipe(
      map(
        response => response._embedded.products
      )
    );
  }
}


interface GetProductResponse{
  _embedded:{
    products:Product[]
  }
}