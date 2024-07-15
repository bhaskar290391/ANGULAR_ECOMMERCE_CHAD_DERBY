import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/commons/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[]=[];
  currentCategoryId:number=1;
  searchKeyWord!: string;

  constructor(private productService:ProductService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(()=>{
      this.handleProductList();
    }
    );

  }
  handleProductList() {
    
    const searchMode=this.route.snapshot.paramMap.has("keyword")!;

    if(searchMode){
      this.listOfProductBySearch();
    }else{
      this.listOfProducByCategory();
    }
  }

  listOfProductBySearch(){
    
    this.searchKeyWord=this.route.snapshot.paramMap.get("keyword")!

    this.productService.searchProduct(this.searchKeyWord).subscribe(
      respose=>{
        this.products=respose;
      }
    )
  }
  listOfProducByCategory() {

    const hasCategoryId=this.route.snapshot.paramMap.has("id");

    if(hasCategoryId){
      this.currentCategoryId=+this.route.snapshot.paramMap.get("id")!
    }else{
      this.currentCategoryId=1
    }


    this.productService.getProductList(this.currentCategoryId).subscribe(
      res=>{
        this.products=res;
      }
    );

  }

}
