package com.luv2code.springboot.Ecommerce.dto;

import com.luv2code.springboot.Ecommerce.entity.Address;
import com.luv2code.springboot.Ecommerce.entity.Customer;
import com.luv2code.springboot.Ecommerce.entity.Order;
import com.luv2code.springboot.Ecommerce.entity.OrderItem;
import jakarta.transaction.UserTransaction;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Order order;
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Set<OrderItem> orderItem;
}
