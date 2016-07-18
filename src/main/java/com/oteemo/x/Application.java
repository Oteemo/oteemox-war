package com.oteemo.x;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;

public interface Application {
	
	@SpringBootApplication
	public class ApplicationRunner extends SpringBootServletInitializer {
	 
	    public static void main(String[] args) {
	        SpringApplication.run(ApplicationRunner.class, args);
	    }
	 
	    @Override
	    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
	        return builder.sources(ApplicationRunner.class);
	    }
	 
	}
	
}
