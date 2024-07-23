package com.luv2code.springboot.Ecommerce.dao;

import com.luv2code.springboot.Ecommerce.entity.Country;
import com.luv2code.springboot.Ecommerce.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource
public interface StateRepo  extends JpaRepository<State,Integer> {

    List<State> findByCountryCode(@Param("code") String code);
}

