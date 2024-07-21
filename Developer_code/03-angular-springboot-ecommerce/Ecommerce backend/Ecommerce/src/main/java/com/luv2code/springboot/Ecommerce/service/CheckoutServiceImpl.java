package com.luv2code.springboot.Ecommerce.service;

import com.luv2code.springboot.Ecommerce.dao.CustomerRepo;
import com.luv2code.springboot.Ecommerce.dto.Purchase;
import com.luv2code.springboot.Ecommerce.dto.PurchaseResponse;
import com.luv2code.springboot.Ecommerce.entity.Customer;
import com.luv2code.springboot.Ecommerce.entity.Order;
import com.luv2code.springboot.Ecommerce.entity.OrderItem;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements  CheckoutService{

    @Autowired
    private CustomerRepo repo;

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        Order order=purchase.getOrder();
        String orderTrackingNumber=generateOrderTracking();
        order.setOrderTrackingNumber(orderTrackingNumber);

        Set<OrderItem> orderItems = purchase.getOrderItem();
        orderItems.forEach(order::add);

        order.setShippingAddress(purchase.getShippingAddress());
        order.setBillingAddress(purchase.getBillingAddress());

        Customer customer=purchase.getCustomer();
        customer.add(order);

        repo.save(customer);

        return  new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTracking() {
        return UUID.randomUUID().toString();
    }
}
