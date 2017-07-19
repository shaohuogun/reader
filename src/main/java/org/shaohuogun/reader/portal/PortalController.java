package org.shaohuogun.reader.portal;

import org.shaohuogun.common.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class PortalController extends Controller {
	
	@RequestMapping(value = {"/entry/**"}, method = RequestMethod.GET)
	public ModelAndView entry() {
		return new ModelAndView("entry");
	}
	
	@RequestMapping(value = {"/index/**"}, method = RequestMethod.GET)
	public ModelAndView index() {
		return new ModelAndView("index");
	}
	
	@RequestMapping(value = {"/service/**"}, method = RequestMethod.GET)
	public ModelAndView service() {
		return new ModelAndView("service");
	}
	
	@RequestMapping(value = {"/mine/**"}, method = RequestMethod.GET)
	public ModelAndView mine() {
		return new ModelAndView("mine");
	}
	
}
