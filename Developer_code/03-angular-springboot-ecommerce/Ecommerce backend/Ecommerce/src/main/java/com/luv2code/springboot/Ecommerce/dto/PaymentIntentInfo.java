package com.luv2code.springboot.Ecommerce.dto;

import lombok.Data;

@Data
public class PaymentIntentInfo {

    private int amount;

    private String currency;

}
