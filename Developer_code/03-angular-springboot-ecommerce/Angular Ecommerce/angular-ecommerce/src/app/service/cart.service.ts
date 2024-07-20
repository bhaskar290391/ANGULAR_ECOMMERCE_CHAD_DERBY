import { Injectable } from '@angular/core';
import { CartItem } from '../commons/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(cartItem: CartItem) {
    let existingCartItem: CartItem | undefined;

    if (this.cartItems.length > 0) {

      existingCartItem = this.cartItems.find((data) => data.id == cartItem.id)!;
    }

    if (existingCartItem != undefined) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }

    this.computeTotals();


  }

  computeTotals() {

    let price: number = 0;
    let qunatity: number = 0;

    for (let cart of this.cartItems) {
      price += cart.quantity * cart.unitPrice;
      qunatity += cart.quantity;
    }

    this.totalPrice.next(price);
    this.totalQuantity.next(qunatity);
  }


  decrementCart(cartItem:CartItem){

    cartItem.quantity--;

    if(cartItem.quantity ==0){
      this.removed(cartItem);
    }else{
      this.computeTotals()
    }

  }
  removed(cartItem: CartItem) {
    
    const cartIndex=this.cartItems.findIndex(data => data.id==cartItem.id);

    if(cartIndex >-1){
      this.cartItems.splice(cartIndex,1);
    }

    this.computeTotals();
  }
}
