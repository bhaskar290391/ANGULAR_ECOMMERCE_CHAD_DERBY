import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Country } from 'src/app/commons/country';
import { State } from 'src/app/commons/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

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
        firstName: new FormControl('',[Validators.required,Validators.minLength(2),CustomValidators.notOnlyWhiteSpaces]),
        lastName: new FormControl('',[Validators.required,Validators.minLength(2),CustomValidators.notOnlyWhiteSpaces]),
        email: new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])
      }),

      shippingAddress: this.formBuilder.group({
        street: new FormControl('',[Validators.required,Validators.minLength(2),CustomValidators.notOnlyWhiteSpaces]),
        city: new FormControl('',[Validators.required,Validators.minLength(2),CustomValidators.notOnlyWhiteSpaces]),
        state: new FormControl('',[Validators.required]),
        country:new FormControl('',[Validators.required]),
        zipcode: new FormControl('',[Validators.required,Validators.minLength(2),CustomValidators.notOnlyWhiteSpaces])
      }),


      billingAddress: this.formBuilder.group({
        street: new FormControl('',[Validators.required,Validators.minLength(2),CustomValidators.notOnlyWhiteSpaces]),
        city: new FormControl('',[Validators.required,Validators.minLength(2),CustomValidators.notOnlyWhiteSpaces]),
        state: new FormControl('',[Validators.required]),
        country: new FormControl('',[Validators.required]),
        zipcode: new FormControl('',[Validators.required,Validators.minLength(2),CustomValidators.notOnlyWhiteSpaces])
      }),


      creditCard: this.formBuilder.group({
        cardType: new FormControl('',[Validators.required]),
        nameOncard: new FormControl('',[Validators.required,Validators.minLength(2),CustomValidators.notOnlyWhiteSpaces]),
        cardNumber: new FormControl('',[Validators.required,Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('',[Validators.required,Validators.pattern('[0-9]{3}')]),
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

  // getter Method for Form Group for validators
  get firstName(){return this.checkoutFormGroup.get("customer.firstName")}
  get lastName(){return this.checkoutFormGroup.get("customer.lastName")}
  get email(){return this.checkoutFormGroup.get("customer.email")}

  get shippingAddressStreet(){return this.checkoutFormGroup.get("shippingAddress.street")}
  get shippingAddressCity(){return this.checkoutFormGroup.get("shippingAddress.city")}
  get shippingAddressState(){return this.checkoutFormGroup.get("shippingAddress.state")}
  get shippingAddressCountry(){return this.checkoutFormGroup.get("shippingAddress.country")}
  get shippingAddressZipcode(){return this.checkoutFormGroup.get("shippingAddress.zipcode")}

  get billingAddressStreet(){return this.checkoutFormGroup.get("billingAddress.street")}
  get billingAddressCity(){return this.checkoutFormGroup.get("billingAddress.city")}
  get billingAddressState(){return this.checkoutFormGroup.get("billingAddress.state")}
  get billingAddressCountry(){return this.checkoutFormGroup.get("billingAddress.country")}
  get billingAddressZipcode(){return this.checkoutFormGroup.get("billingAddress.zipcode")}

  get cartType(){return this.checkoutFormGroup.get("creditCard.cardType")}
  get nameOncard(){return this.checkoutFormGroup.get("creditCard.nameOncard")}
  get cardNumber(){return this.checkoutFormGroup.get("creditCard.cardNumber")}
  get securityCode(){return this.checkoutFormGroup.get("creditCard.securityCode")}
  // getter Method for Form Group for validators
  
  reviewCartDetails() {
    this.cartService.totalPrice.subscribe(data => {
      this.totalPrice = data;
    })


    this.cartService.totalQuantity.subscribe(data => {
      this.totalQuantity = data;
    })
  }

  onSubmit() {
    console.log("Customer  : " + JSON.stringify(this.checkoutFormGroup.controls['customer'].value));

    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }


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
