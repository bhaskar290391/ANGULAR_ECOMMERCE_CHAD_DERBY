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
  previousCategoryId:number=1;
  searchKeyWord!: string;
  previousSearchKeyword!:string;

  thePageNumber:number=1;
  thePageSize=5;
  theTotalElement=0;

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

    if(this.previousSearchKeyword !=this.searchKeyWord){
      this.thePageNumber=1;
    }

    this.previousSearchKeyword=this.searchKeyWord;

    this.productService.searchProductBypaginate(this.thePageNumber-1,this.thePageSize,this.searchKeyWord).subscribe(
      res=>{
        this.products=res._embedded.products;
        this.thePageNumber=res.page.number+1;
        this.thePageSize=res.page.size;
        this.theTotalElement=res.page.totalElements;
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

    if(this.previousCategoryId !=this.currentCategoryId){
      this.thePageNumber=1;
    }

    this.previousCategoryId=this.currentCategoryId;

    this.productService.getProductListBypaginate(this.thePageNumber-1,this.thePageSize,this.currentCategoryId).subscribe(
      res=>{
        this.products=res._embedded.products;
        this.thePageNumber=res.page.number+1;
        this.thePageSize=res.page.size;
        this.theTotalElement=res.page.totalElements;
      }
    );

  }

  selectSize(size: string) {
    this.thePageSize =+size;
    this.thePageNumber=1;
    this.handleProductList();
  }
    
}
