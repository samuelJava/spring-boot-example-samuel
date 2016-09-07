package com.cuga.demo.webapp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.mongodb.MongoClient;

@Configuration
@ComponentScan
@EnableAutoConfiguration
public class Application extends SpringBootServletInitializer {

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @Autowired
    private MongoClient mongoClient;

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(Application.class);
        app.run(args);
    }

    @Autowired
    private EmbeddedMongoServer mongoServer;

    @Bean
    public EmbeddedMongoServer mongoServer() throws Exception {
        return new EmbeddedMongoServer();
    }

    @Bean
    public MongoClient mongoClient() {
        log.info("Setting up embedded mongo client");
        try {
            return mongoServer().getMongoClient();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new RuntimeException(e);
        }
    }

    @Bean
    public CorsFilter corsFilter() {

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true); // you USUALLY want this
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("OPTIONS");
        config.addAllowedMethod("HEAD");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("PATCH");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    @Bean
    DisposableBean closeDatabaseConnections() {
        return new DisposableBean() {
            @Override
            public void destroy() throws Exception {
                log.info("Shutting down mongo connection pool");
                try {
                    mongoClient.close();
                } catch (Exception e) {
                    log.error(e.getMessage(), e);
                }
                try {
                    mongoServer.close();
                } catch (Exception e) {
                    log.error(e.getMessage(), e);
                }

            }
        };
    }

    /**
     * Useful if we need to customize the container when running in embedded mode
     * 
     * @return bean
     */
    @Bean
    public EmbeddedServletContainerCustomizer customizeServletContainer() {
        return new EmbeddedServletContainerCustomizer() {
            @Override
            public void customize(ConfigurableEmbeddedServletContainer container) {
            }
        };
    }

}