import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/commons/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {


  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listOfCartItems();
  }

  listOfCartItems() {

    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data;
      }
    );


    this.cartService.totalQuantity.subscribe(
      data => {
        this.totalQuantity = data;
      }
    );

    this.cartService.computeTotals();
  }

  decrementCartItems(cart: CartItem) {
    this.cartService.decrementCart(cart);
  }


  incrementCartItems(cart: CartItem) {
    this.cartService.addToCart(cart);
  }
  removeItems(cart: CartItem) {
    this.cartService.removed(cart);
  }

}
