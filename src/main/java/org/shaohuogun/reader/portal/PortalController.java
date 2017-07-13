package org.shaohuogun.reader.portal;

import org.shaohuogun.common.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class PortalController extends Controller {

	@RequestMapping(value = {"/index/**"}, method = RequestMethod.GET)
	public ModelAndView index() {
		return new ModelAndView("index");
	}

	@RequestMapping(value = {"/product/**"}, method = RequestMethod.GET)
	public ModelAndView product() {
		return new ModelAndView("product");
	}		
	
	@RequestMapping(value = {"/usercenter/**"}, method = RequestMethod.GET)
	public ModelAndView userCenter() {
		return new ModelAndView("userCenter");
	}	
	
}
