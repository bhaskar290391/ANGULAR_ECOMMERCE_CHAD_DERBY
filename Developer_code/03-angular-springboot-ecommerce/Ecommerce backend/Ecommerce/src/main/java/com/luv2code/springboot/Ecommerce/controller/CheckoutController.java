package com.luv2code.springboot.Ecommerce.controller;

import com.luv2code.springboot.Ecommerce.dto.PaymentIntentInfo;
import com.luv2code.springboot.Ecommerce.dto.Purchase;
import com.luv2code.springboot.Ecommerce.dto.PurchaseResponse;
import com.luv2code.springboot.Ecommerce.service.CheckoutService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService service;

    CheckoutController(CheckoutService service){
        this.service=service;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        return service.placeOrder(purchase);
    }
    
    
    @PostMapping("/payment")
    public ResponseEntity<String> payment(@RequestBody PaymentIntentInfo info) throws StripeException{
        PaymentIntent data=service.createPaymentIntent(info);
    	return new ResponseEntity<String>(data.toJson(), HttpStatus.OK);
    }
}
