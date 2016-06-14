package com.oteemo.x.pdf;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.oteemo.x.account.Account;
import com.oteemo.x.signup.SignupForm;
import com.oteemo.x.web.MessageHelper;

@Controller
public class PdfSearchController {
	
	@RequestMapping(value = "/pdfsearch")
	public String pdfuploader() {
        return "pdf/pdfsearch";
    }	
}
