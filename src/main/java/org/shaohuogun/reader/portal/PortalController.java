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
	
	@RequestMapping(value = {"/home/**"}, method = RequestMethod.GET)
	public ModelAndView home() {
		return new ModelAndView("home");
	}
	
	@RequestMapping(value = {"/tool/**"}, method = RequestMethod.GET)
	public ModelAndView tool() {
		return new ModelAndView("tool");
	}
	
	@RequestMapping(value = {"/mine/**"}, method = RequestMethod.GET)
	public ModelAndView mine() {
		return new ModelAndView("mine");
	}
	
	@RequestMapping(value = {"/about/**"}, method = RequestMethod.GET)
	public ModelAndView about() {
		return new ModelAndView("about");
	}
	
}
