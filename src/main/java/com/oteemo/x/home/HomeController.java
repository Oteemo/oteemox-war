package com.oteemo.x.home;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String index(Principal principal) {
		return principal != null ? "home/homeSignedIn" : "home/homeNotSignedIn";
	}
	
	@RequestMapping(value = "/bubble", method = RequestMethod.GET)
	public String bubble(Principal principal) {
		return principal != null ? "home/bubble" : "home/homeNotSignedIn";
	}
}
