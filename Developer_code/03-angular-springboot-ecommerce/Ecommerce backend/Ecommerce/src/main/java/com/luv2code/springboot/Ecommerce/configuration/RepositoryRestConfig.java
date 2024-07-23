package com.luv2code.springboot.Ecommerce.configuration;

import com.luv2code.springboot.Ecommerce.entity.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class RepositoryRestConfig implements RepositoryRestConfigurer {

    @Autowired
    private EntityManager manager;

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        HttpMethod[] unsupported={HttpMethod.DELETE,HttpMethod.POST,HttpMethod.PUT,HttpMethod.PATCH};

        readOnlyApiForEntity(config,Product.class, unsupported);
        readOnlyApiForEntity(config, ProductCategory.class, unsupported);
        readOnlyApiForEntity(config, Country.class, unsupported);
        readOnlyApiForEntity(config, State.class, unsupported);
        readOnlyApiForEntity(config, Order.class, unsupported);

        exposeIds(config);

        cors.addMapping("/api/**").allowedOrigins("http://localhost:4200");
    }

    private static void readOnlyApiForEntity(RepositoryRestConfiguration config,Class thClass, HttpMethod[] unsupported) {
        config.getExposureConfiguration()
                .forDomainType(thClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(unsupported))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unsupported));
    }

    private void exposeIds(RepositoryRestConfiguration config) {

        Set<EntityType<?>> entities = manager.getMetamodel().getEntities();

        List<Class> entityClass=new ArrayList<>();

        for(EntityType data:entities){
            entityClass.add(data.getJavaType());
        }

        Class[] domainType=entityClass.toArray(new Class[0]);
        config.exposeIdsFor(domainType);
    }
}
