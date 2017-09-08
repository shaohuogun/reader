package org.shaohuogun.reader.portal.user.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.shaohuogun.common.Controller;
import org.shaohuogun.common.Utility;
import org.shaohuogun.reader.portal.invitation.model.Invitation;
import org.shaohuogun.reader.portal.user.model.Portrait;
import org.shaohuogun.reader.portal.user.model.User;
import org.shaohuogun.reader.portal.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController extends Controller {

	private static final String VIEW_USER_FORM = "user/form";
	private static final String VIEW_USER_INFO = "user/info";
	private static final String VIEW_USER_LIST = "user/list";

	@Autowired
	private UserService userService;
		
	@RequestMapping(value = "/api/user", method = RequestMethod.POST)
	public @ResponseBody User createUser(@RequestBody @Validated User user) throws Exception {
		user.setId(Utility.getUUID());
		user.setCreator("a11039eb-4ba1-441a-bfdb-0d40f61a53dd");
		return userService.createUser(user);
//		return "redirect:/home";
	}
	
	@RequestMapping(value = "/api/session", method = RequestMethod.POST)
	public @ResponseBody SigninForm createSession(@RequestBody @Validated SigninForm signinForm) throws Exception {		
		return signinForm;	
//		return "redirect:/home";
	}

	@RequestMapping(value = "/user/{userId}/form", method = RequestMethod.GET)
	public String gotoUserForm(HttpServletRequest req, Model model) {
		User user = (User) req.getSession().getAttribute(CURRENT_USER);
		model.addAttribute(user);

		PortraitFile portraitFile = new PortraitFile();
		model.addAttribute(portraitFile);
		return VIEW_USER_FORM;
	}

	@RequestMapping(value = "/user/{userId}/info", method = RequestMethod.GET)
	public String gotoUserInfo(Model model) {
		// 列表页面内嵌创建邀请表单，减少低效的页面跳转
		Invitation invitation = new Invitation();
		model.addAttribute(invitation);

		return VIEW_USER_INFO;
	}

	@RequestMapping(value = "/user/list", method = RequestMethod.GET)
	public String gotoUserList() {
		return VIEW_USER_LIST;
	}

	@RequestMapping(value = "/user/{userId}", method = RequestMethod.GET)
	public @ResponseBody User getUser(@PathVariable String userId) throws Exception {
		return userService.getUser(userId);
	}

	@RequestMapping(value = "/users", method = RequestMethod.GET)
	public @ResponseBody List<User> queryUsers(@RequestParam int pageNumber) {
		return userService.queryUsers(((pageNumber - 1) * 10 + 1), 10);
	}

	@RequestMapping(value = "/portrait", method = RequestMethod.POST)
	public void updatePortrait(HttpServletRequest req, PortraitFile portraitFile) {
		User user = (User) req.getSession().getAttribute(CURRENT_USER);

		Portrait portrait = new Portrait();
		portrait.setContent(portraitFile.getContent().getBytes());
		portrait.setUserId(user.getId());
		userService.updatePortrait(portrait);
	}
	
	protected void writePortrait(Portrait portrait, HttpServletResponse resp) throws Exception {
		if (null == portrait) {
			throw new NullPointerException("User cann't be null.");
		}

		if (null == resp) {
			throw new NullPointerException("HttpServletResponse cann't be null.");
		}

		// 设置3个禁止缓存参数
		resp.setHeader("Pragma", "No-cache");
		resp.setHeader("Cache-Control", "no-cache");
		resp.setDateHeader("Expires", 0);

		// 将图片字节码直接写回到应答报文体中
		resp.setCharacterEncoding(ENCODING_UTF8);
		resp.setContentType(CONTENT_TYPE_IMAGE);
		// 可以让WEB容器在一个TCP连接中发送完
		resp.setContentLength(portrait.getContent().length);

		resp.getOutputStream().write(portrait.getContent());
		resp.getOutputStream().flush();
		resp.getOutputStream().close();
	}

	@RequestMapping(value = "/user/{userId}/portrait", method = RequestMethod.GET)
	public void getUserPortrait(@PathVariable String userId, HttpServletResponse resp) throws Exception {
		// 回写图片内容给浏览器
		writePortrait(userService.getPortraitByUserId(userId), resp);
	}

	@RequestMapping(value = "/portrait/{portraitId}", method = RequestMethod.GET)
	public void getPortrait(@PathVariable String portraitId, HttpServletResponse resp) throws Exception {
		// 回写图片内容给浏览器
		writePortrait(userService.getPortrait(portraitId), resp);
	}

}
