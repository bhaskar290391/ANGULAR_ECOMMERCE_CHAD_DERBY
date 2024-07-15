import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/commons/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategory:ProductCategory[]=[];

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getProductCategoryList();
  }

  getProductCategoryList() {
    this.productService.getProductCateroiesList().subscribe(
      Response=>{
        this.productCategory=Response;
      }
    )
  }

}
