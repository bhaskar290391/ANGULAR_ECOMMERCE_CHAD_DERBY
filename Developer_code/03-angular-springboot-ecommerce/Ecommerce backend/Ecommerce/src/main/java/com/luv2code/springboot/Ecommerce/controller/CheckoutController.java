package com.luv2code.springboot.Ecommerce.controller;

import com.luv2code.springboot.Ecommerce.dto.Purchase;
import com.luv2code.springboot.Ecommerce.dto.PurchaseResponse;
import com.luv2code.springboot.Ecommerce.service.CheckoutService;
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
}
