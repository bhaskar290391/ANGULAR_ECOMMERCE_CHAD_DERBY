package com.luv2code.springboot.Ecommerce.dao;

import com.luv2code.springboot.Ecommerce.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@Repository
public interface CountryRepo extends JpaRepository<Country,Integer> {
}
