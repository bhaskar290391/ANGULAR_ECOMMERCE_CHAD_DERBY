package com.luv2code.springboot.Ecommerce.dao;

import com.luv2code.springboot.Ecommerce.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface OrderRepository extends JpaRepository<Order,Long> {


    Page<Order> findByCustomerEmailOrderByCreatedDate(@Param("email") String email, Pageable pageable);
}
