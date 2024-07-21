import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName } from '@angular/forms';
import { first } from 'rxjs';
import { Country } from 'src/app/commons/country';
import { State } from 'src/app/commons/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  countries: Country[] = [];

  billingAddressStates: State[] = [];
  shippingAddressStates: State[] = [];
  expirationYears!: number[];
  expirationMonths!: number[];

  constructor(private formBuilder: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutService
  ) { }

  ngOnInit(): void {

    this.checkoutService.getExpirationYears().subscribe(
      data => {
        this.expirationYears = data;
      }
    )

    let startMonth = new Date().getMonth() + 1;
    this.checkoutService.getExpirationMonth(startMonth).subscribe(
      data => {
        this.expirationMonths = data;
      }
    )

    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({

      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),

      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
      }),


      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
      }),


      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOncard: [''],
        cardNumber: [],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      }),
    });


    this.checkoutService.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    )
  }

  reviewCartDetails() {
    this.cartService.totalPrice.subscribe(data => {
      this.totalPrice = data;
    })


    this.cartService.totalQuantity.subscribe(data => {
      this.totalQuantity = data;
    })
  }

  onSubmit() {
    console.log("Customer  : " + JSON.stringify(this.checkoutFormGroup.controls['customer'].value))
  }

  copyShippingTOBillingAddress(event: any) {

    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value)
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }


  }


  populateStates(formGroupName: string) {

    const countryCode = this.checkoutFormGroup.controls[formGroupName].value.country.code;

    this.checkoutService.getStatesByCountryCode(countryCode).subscribe(
      data => {

        if (formGroupName == "shippingAddress") {
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data;
        }

        this.checkoutFormGroup.controls[formGroupName].get('state')?.setValue(data[0]);
      }
    );
  }



  checkMonthsInYears() {
    let startMonth=0;
    let currentYear=new Date().getFullYear();

    let yearSelected=this.checkoutFormGroup.get('creditCard.expirationYear')?.value;

    if(yearSelected == currentYear){
      startMonth=new Date().getMonth()+1;
    }else{
      startMonth=1
    }

    this.checkoutService.getExpirationMonth(startMonth).subscribe(data=>{
      this.expirationMonths=data;
    });
}
}
