import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/commons/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[]=[];

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.listOfProduct();
  }
  listOfProduct() {
    this.productService.getProductList().subscribe(
      res=>{
        this.products=res;
      }
    );

  }

}
