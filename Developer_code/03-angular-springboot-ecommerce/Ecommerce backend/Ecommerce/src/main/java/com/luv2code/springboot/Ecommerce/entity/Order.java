package com.luv2code.springboot.Ecommerce.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long id;

    @Column(name = "order_tracking_number")
    private String orderTrackingNumber;

    @Column(name = "status")
    private String status;

    @Column(name = "total_price")
    private BigDecimal totalPrice;

    @Column(name = "total_quantity")
    private int totalQuantity;

    @Column(name = "date_created")
    private Date createdDate;

    @Column(name = "last_updated")
    private Date updatedDate;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "shipping_address_id",referencedColumnName = "id")
    private Address shippingAddress;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "billing_address_id",referencedColumnName = "id")
    private Address billingAddress;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_id")
    private Customer customer;


    @OneToMany(mappedBy = "orders",cascade = CascadeType.ALL)
    private Set<OrderItem> orderItems=new HashSet<>();


    public void add(OrderItem orderItem){

        if(orderItem !=null){
            if(orderItems == null){
                orderItems=new HashSet<>();
            }

            orderItems.add(orderItem);
            orderItem.setOrders(this);
        }
    }
}
