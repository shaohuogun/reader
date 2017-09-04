package org.shaohuogun.reader.portal.invitation.controller;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.shaohuogun.common.Controller;
import org.shaohuogun.common.Pagination;
import org.shaohuogun.reader.portal.invitation.model.Invitation;
import org.shaohuogun.reader.portal.invitation.service.InvitationService;
import org.shaohuogun.reader.portal.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InvitationController extends Controller {

	@Autowired
	private InvitationService invitationService;

	@RequestMapping(value = "/invitation", method = RequestMethod.POST)
	public Invitation createInvitation(HttpServletRequest req, @Valid Invitation invitation) {
		User creator = (User) req.getSession().getAttribute(CURRENT_USER);
		if (null == creator) {
			throw new NullPointerException("Please login again.");			
		}
		
		invitation.setCreator(creator.getId());
		// 设置类型为加盟邀请
		invitation.setType(Invitation.TYPE_JOIN);
		invitationService.createInvitation(invitation);
		return invitation;
	}

	@RequestMapping(value = "/invitations", method = RequestMethod.GET)
	public Pagination getInvitations(
			@RequestParam(defaultValue = Invitation.STATUS_INITIAL, required = false) String status,
			@RequestParam(defaultValue = "1", required = false) int page) throws Exception {
		int total = invitationService.countInvitationByStatus(status);
		Pagination pagination = new Pagination();
		pagination.setTotal(total);
		pagination.setPageIndex(page);
		return invitationService.getInvitationsByStatus(status, pagination);
	}

}
