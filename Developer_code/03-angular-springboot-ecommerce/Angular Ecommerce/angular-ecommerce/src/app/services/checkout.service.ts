import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../commons/country';
import { State } from '../commons/state';
import { Purchase } from '../commons/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {


  constructor(private httpClient: HttpClient) { }

  countryUrl: string = "http://localhost:8080/api/countries";
  stateUrl: string = "http://localhost:8080/api/states";


  getExpirationMonth(startMonth: number): Observable<number[]> {
    let expirationMonths: number[] = [];
    for (let month = startMonth; month <= 12; month++) {
      expirationMonths.push(month);
    }
    return of(expirationMonths);
  }

  getExpirationYears(): Observable<number[]> {
    let currentYears = new Date().getFullYear();
    let endYears = currentYears + 10;

    let expirationyears: number[] = [];

    for (let years = currentYears; years <= endYears; years++) {

      expirationyears.push(years);
    }

    return of(expirationyears);
  }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetCountryResponse>(this.countryUrl).pipe(
      map(response => response._embedded.countries)
    )
  }


  getStatesByCountryCode(code: string): Observable<State[]> {
    return this.httpClient.get<GetStateResponse>(this.stateUrl + "/search/findByCountryCode?code=" + code).pipe(
      map(response => response._embedded.states)
    )
  }


  placeOrder(purchase: Purchase) :Observable<any>{
    const purchaseUrl="http://localhost:8080/api/checkout/purchase";

    return this.httpClient.post<any>(purchaseUrl,purchase);
  }
}

export interface GetCountryResponse {
  _embedded: {
    countries: Country[]
  }
}

export interface GetStateResponse {
  _embedded: {
    states: State[]
  }
}