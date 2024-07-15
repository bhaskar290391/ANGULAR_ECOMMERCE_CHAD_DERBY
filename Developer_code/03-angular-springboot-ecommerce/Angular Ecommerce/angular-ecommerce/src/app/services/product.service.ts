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

  getProductList(currentCategoryId: number): Observable<Product[]> {
    const searchUrl = this.productBaseUrl + "/search/findByCategoryId?id=" + currentCategoryId;
    return this.httpClient.get<GetProductResponse>(searchUrl).pipe(
      map(
        response => response._embedded.products
      )
    );
  }

  searchProduct(searchKeyWord: string) {
    const searchUrl = this.productBaseUrl + "/search/findByNameContaining?name=" + searchKeyWord;
    return this.httpClient.get<GetProductResponse>(searchUrl).pipe(
      map(
        response => response._embedded.products
      )
    );
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
  }
}

interface GetProductCategoryResponse {
  _embedded: {
    productCategories: ProductCategory[]
  }
}