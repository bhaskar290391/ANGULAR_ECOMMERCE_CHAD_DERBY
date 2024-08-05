package com.luv2code.springboot.Ecommerce.service;

import com.luv2code.springboot.Ecommerce.dto.PaymentIntentInfo;
import com.luv2code.springboot.Ecommerce.dto.Purchase;
import com.luv2code.springboot.Ecommerce.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

    PaymentIntent createPaymentIntent(PaymentIntentInfo info) throws StripeException;
}
