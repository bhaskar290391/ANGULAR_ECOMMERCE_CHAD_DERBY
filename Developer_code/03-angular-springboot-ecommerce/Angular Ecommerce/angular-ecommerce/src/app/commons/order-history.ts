export class OrderHistory {

    constructor(public orderId:number,
        public orderTrackingNumber:string,
        public totalPrice:number,
        public totalQuantity:number,
        public createdDate:Date,

    ){

    }
}
