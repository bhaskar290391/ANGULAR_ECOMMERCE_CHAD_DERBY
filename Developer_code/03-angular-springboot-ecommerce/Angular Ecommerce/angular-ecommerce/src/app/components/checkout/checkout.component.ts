import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  totalPrice:number=0;
  totalQuantity:number=0;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.checkoutFormGroup=this.formBuilder.group({

      customer:this.formBuilder.group({
        firstName:[''],
        lastName:[''],
        email:['']
      }),

      shippingAddress:this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipcode:['']
      }),

      
      billingAddress:this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipcode:['']
      }),

      
      creditCard:this.formBuilder.group({
        cardType:[''],
        nameOncard:[''],
        cardNumber:[],
        securityCode:[''],
        expirationMonth:[''],
        expirationYear:['']
      }),
    });
  }

  onSubmit() {
    console.log("Customer  : " +JSON.stringify(this.checkoutFormGroup.controls['customer'].value))
  }

  copyShippingTOBillingAddress(event:any) {

    if(event.target.checked){
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value)
    }else{
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
    
  }

}
