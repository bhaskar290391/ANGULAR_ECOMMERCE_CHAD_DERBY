package com.luv2code.springboot.Ecommerce.configuration;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
public class SecurityConfig {

//    public SecurityFilterChain security(HttpSecurity http) throws Exception {
//        http.authorizeHttpRequests( request -> request.requestMatchers("/api/orders/**")
//                .authenticated()
//                .anyRequest().permitAll())
//                .oauth2ResourceServer(resource -> resource.jwt(Customizer.withDefaults()));
//
//        http.setSharedObject(ContentNegotiationStrategy.class,new HeaderContentNegotiationStrategy());
//
//        Okta.configureResourceServer401ResponseBody(http);
//
//        http.csrf(AbstractHttpConfigurer::disable);
//
//        http.cors(Customizer.withDefaults());
//        return http.build();
//    }
}
