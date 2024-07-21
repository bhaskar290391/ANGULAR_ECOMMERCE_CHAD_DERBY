import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/commons/cart-item';
import { Product } from 'src/app/commons/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!:Product
  constructor(private productService:ProductService,
              private route:ActivatedRoute,
            private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetails();
    })
  }

  handleProductDetails() {
     const productId=+this.route.snapshot.paramMap.get("id")!;
     
    this.productService.productById(productId).subscribe(
      response=>{
        this.product=response;
      }
    )
  }


  addToCart() {
    let cartItem=new CartItem(this.product);
    this.cartService.addToCart(cartItem);
  }

}


