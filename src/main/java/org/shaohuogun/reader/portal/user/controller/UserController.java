package org.shaohuogun.reader.portal.user.controller;

import javax.servlet.http.HttpServletRequest;

import org.shaohuogun.common.Controller;
import org.shaohuogun.common.Utility;
import org.shaohuogun.reader.portal.user.model.User;
import org.shaohuogun.reader.portal.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController extends Controller {

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/api/user", method = RequestMethod.POST)
	public User createUser(HttpServletRequest req, @RequestBody User user) throws Exception {
		user.setId(Utility.getUUID());
		user.setCreator("a11039eb-4ba1-441a-bfdb-0d40f61a53dd");		
		return userService.createUser(user);
	}

	@RequestMapping(value = "/api/user/{id}", method = RequestMethod.GET)
	public User getUser(@PathVariable String id) throws Exception {
		return userService.getUser(id);
	}

}
