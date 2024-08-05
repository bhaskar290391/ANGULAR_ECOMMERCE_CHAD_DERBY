package com.luv2code.springboot.Ecommerce.service;

import com.luv2code.springboot.Ecommerce.dao.CustomerRepo;
import com.luv2code.springboot.Ecommerce.dto.PaymentIntentInfo;
import com.luv2code.springboot.Ecommerce.dto.Purchase;
import com.luv2code.springboot.Ecommerce.dto.PurchaseResponse;
import com.luv2code.springboot.Ecommerce.entity.Customer;
import com.luv2code.springboot.Ecommerce.entity.Order;
import com.luv2code.springboot.Ecommerce.entity.OrderItem;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements  CheckoutService{

    @Autowired
    private CustomerRepo repo;

    public CheckoutServiceImpl(CustomerRepo repo,
                               @Value("${stripe.key.secret}") String secretKey) {

        this.repo = repo;

        // initialize Stripe API with secret key
        Stripe.apiKey = secretKey;
    }

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

        Customer CustomerDB=repo.findByEmail(customer.getEmail());

        if(CustomerDB !=null){
            customer=CustomerDB;
        }

        customer.add(order);

        repo.save(customer);

        return  new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTracking() {
        return UUID.randomUUID().toString();
    }

	@Override
	public PaymentIntent createPaymentIntent(PaymentIntentInfo info) throws StripeException {
		
		List<String> paymentMethodType=new ArrayList<>();
		paymentMethodType.add("card");
		
		Map<String, Object> params=new HashMap<>();
		params.put("amount", info.getAmount());
		params.put("currency", info.getCurrency());
		params.put("payment_method_types", paymentMethodType);
        params.put("description", "Bhaskar Purchase");
		
		return PaymentIntent.create(params);
	}
}
