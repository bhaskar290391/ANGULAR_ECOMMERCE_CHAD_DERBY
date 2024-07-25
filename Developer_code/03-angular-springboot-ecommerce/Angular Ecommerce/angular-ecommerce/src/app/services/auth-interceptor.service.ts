import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { from, lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(@Inject(OKTA_AUTH )private oktaAuth:OktaAuth) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   return from(this.handleRequest(req,next));
  }
 
 async handleRequest(req: HttpRequest<any>, next: HttpHandler): Promise<any> {

    // const securedEndPoints=['http://localhost:8080/api/orders'];

    // if(securedEndPoints.some(data => req.urlWithParams.includes(data))){

    //   const accessToken= this.oktaAuth.getAccessToken;

    //   req=req.clone({
    //     setHeaders:{
    //       Authorization:'Bearer '+accessToken
    //     }
          
    //   });
    // }
    // return await lastValueFrom(next.handle(req));
  };
}
