package com.luv2code.springboot.Ecommerce.dao;

import com.luv2code.springboot.Ecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepo extends JpaRepository<Customer,Long> {

    Customer findByEmail(String email);
}
