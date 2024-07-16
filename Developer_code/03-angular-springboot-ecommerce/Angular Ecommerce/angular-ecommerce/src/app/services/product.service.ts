import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../commons/product';
import { ProductCategory } from '../commons/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  

  productBaseUrl = "http://localhost:8080/api/products";
  productCategoryBaseUrl = "http://localhost:8080/api/productCategories"

  constructor(private httpClient: HttpClient) { }


  
  getProductListBypaginate(pageNumber:number,pageSize:number,currentCategoryId: number): Observable<GetProductResponse> {
    const searchUrl = this.productBaseUrl + "/search/findByCategoryId?id=" + currentCategoryId+"&page="+pageNumber+"&size="+pageSize;
    return this.httpClient.get<GetProductResponse>(searchUrl);
  }

  productById(productId: number):Observable<Product> {
    return this.httpClient.get<Product>(this.productBaseUrl+"/"+productId);
  }



  searchProductBypaginate(pageNumber:number,pageSize:number,searchKeyWord: string):Observable<GetProductResponse> {
    const searchUrl = this.productBaseUrl + "/search/findByNameContaining?name=" + searchKeyWord+`&page=${pageNumber}&size=${pageSize}`;
    return this.httpClient.get<GetProductResponse>(searchUrl);
  }

  getProductCateroiesList(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetProductCategoryResponse>(this.productCategoryBaseUrl).pipe(
      map(
        response => response._embedded.productCategories
      )
    );
  }


}


interface GetProductResponse {
  _embedded: {
    products: Product[]
  },
  page : {
    size : number,
    totalElements : number,
    totalPages : number,
    number : number
  }
}

interface GetProductCategoryResponse {
  _embedded: {
    productCategories: ProductCategory[]
  }
}