package org.shaohuogun.reader.read.adapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.shaohuogun.common.Controller;
import org.shaohuogun.reader.read.service.ReadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WxmpController extends Controller {

	@Autowired
	private ReadService readService;
	
	@RequestMapping(value = "/api/wxmpadapter", method = RequestMethod.POST)
	public void wxmpAdapter(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		
	}
	
}
