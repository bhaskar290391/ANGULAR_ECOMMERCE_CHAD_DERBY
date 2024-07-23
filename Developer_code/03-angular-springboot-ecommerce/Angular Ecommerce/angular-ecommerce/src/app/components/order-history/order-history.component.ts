import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/commons/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
orderHistory: OrderHistory[]=[];

  constructor(private orderService:OrderHistoryService) { }

  ngOnInit(): void {
  this.fetchOrderHistory();
  }
  fetchOrderHistory() {
    this.orderService.orderHistory("mudaliyarbhaskar29@gmail.com").subscribe(
      data=>{
        this.orderHistory=data;
      }
    )
  }

}
