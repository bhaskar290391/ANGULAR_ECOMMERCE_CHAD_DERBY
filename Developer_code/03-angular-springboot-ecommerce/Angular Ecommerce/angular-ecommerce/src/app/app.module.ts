import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponentComponent } from './components/search-component/search-component.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import {OKTA_CONFIG,OktaCallbackComponent, OktaAuthModule} from '@okta/okta-angular';

import {OktaAuth} from '@okta/okta-auth-js';
import myAppConfig from './config/my-app-config';

const oktaConfig= myAppConfig.oidc;

const oktaAuth= new OktaAuth(oktaConfig);

const routes:Routes=[

  {path:"login/callback",component:OktaCallbackComponent},
  {path:"login",component:LoginComponent},
  {path:"checkout",component:CheckoutComponent},
  {path:"cart-details",component:CartDetailsComponent},
  {path:"product/:id",component:ProductDetailsComponent},
  {path:"search/:keyword",component:ProductListComponent},
  {path:"category/:id",component:ProductListComponent},
  {path:"category",component:ProductListComponent},
  {path:"product",component:ProductListComponent},
  {path:"",component:ProductListComponent},
  {path:"**",component:ProductListComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponentComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService,{provide:OKTA_CONFIG,useValue:{oktaAuth}}],

  bootstrap: [AppComponent]
})
export class AppModule { }
