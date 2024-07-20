import { Product } from "./product";

export class CartItem {

    public id!:number ;
    public name!:string;
    public imageUrl!:string;
    public unitPrice!:number;
    public quantity!:number

    constructor(product:Product){
        this.id=product.id;
        this.imageUrl=product.imageUrl;
        this.name=product.name;
        this.unitPrice=product.unitPrice;
        this.quantity=1;
    }
}
