package org.shaohuogun.reader.portal.invitation.service;

import java.util.Date;
import java.util.List;

import org.shaohuogun.common.Entity;
import org.shaohuogun.common.Pagination;
import org.shaohuogun.reader.portal.WNXLocale;
import org.shaohuogun.reader.portal.invitation.dao.InvitationDao;
import org.shaohuogun.reader.portal.invitation.model.Invitation;
import org.shaohuogun.reader.portal.user.model.User;
import org.shaohuogun.reader.portal.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InvitationService {

	private static final String SCHEME_HTTP = "http";

	@Autowired
	private WNXLocale wnxLocale;
	
//	@Autowired
//	private WNXSmtp wnxSmtp;

	@Autowired
	private InvitationDao invitationDao;

	@Autowired
	private UserService userService;

	private boolean isAvailable(String email) {
		if (userService.getUserByEmail(email) == null) {
			return true;
		}
		
		return false;
	}

	@Transactional
	public void createInvitation(Invitation invitation) {		
		if (invitation == null) {
			throw new NullPointerException("Invitation cann't be null.");
		}
		
		// 若被邀请的邮箱已经在系统中注册了，则不再发送邮件了
		if (!isAvailable(invitation.getAddressee())) {
			invitation.setStatus(Invitation.STATUS_ACCEPTED);
		}
		
		invitationDao.insert(invitation);
	}

	@Transactional(readOnly = true)
	public Invitation getInvitation(String id) {
		if ((id == null) || id.isEmpty()) {
			throw new IllegalArgumentException("Id cann't be null or empty.");
		}
		
		return invitationDao.selectById(id);
	}

	@Transactional(readOnly = true)
	public List<Invitation> getInvitationsByAddressee(String addressee) {
		if ((addressee == null) || addressee.isEmpty()) {
			throw new IllegalArgumentException("Addressee cann't be null or empty.");
		}
		
		return invitationDao.selectByAddressee(addressee);
	}
	
	@Transactional(readOnly = true)
	public int countInvitationByStatus(String status) {
		if ((status == null) || status.isEmpty()) {
			throw new IllegalArgumentException("Status cann't be null or empty.");
		}
		
		return invitationDao.countByStatus(status);
	}

	@Transactional(readOnly = true)
	public Pagination getInvitationsByStatus(String status, Pagination pagination) throws Exception {
		if ((status == null) || status.isEmpty()) {
			throw new IllegalArgumentException("Status cann't be null or empty.");
		}

		if (pagination == null) {
			throw new NullPointerException("Pagination cann't be null.");
		}

		int offset = (pagination.getPageIndex() - 1) * pagination.getPageSize();
		int limit = pagination.getPageSize();
		List<Entity> invitations = invitationDao.selectByStatus(status, offset, limit);
		pagination.setObjects(invitations);
		return pagination;
	}

	private String format(Invitation invitation, String domainName) throws Exception {
		if ((domainName == null) || domainName.isEmpty()) {
			throw new IllegalArgumentException("Domain's name cann't be null or empty.");
		}

		String idBASE64 = Encryptor.encBASE64(invitation.getId().toString());
		String addresseeBASE64 = Encryptor.encBASE64(invitation.getAddressee());

		String acceptUrl = SCHEME_HTTP + "://" + domainName + "/api/invitation/accept/" + idBASE64 + "/"
				+ addresseeBASE64;
		return invitation.getContent() + "\n\n" + acceptUrl;
	}

	@Transactional
	public void sendInvitations(Integer count, String domainName) throws Exception {
		List<Invitation> invitations = invitationDao.selectForSending(0, count);
		if ((invitations == null) || invitations.isEmpty()) {
			return;
		}

		for (Invitation curInvitation : invitations) {
			User creator = userService.getUser(curInvitation.getCreator());
//			wnxSmtp.send(creator.getEmail(), curInvitation.getAddressee(), curInvitation.getSubject(),
//					format(curInvitation, domainName));
			// 发送成功后更新邀请的状态
			curInvitation.setLastModifyDate(new Date());
			curInvitation.setStatus(Invitation.STATUS_SENT);
			invitationDao.update(curInvitation);
		}
	}

	@Transactional(readOnly = true)
	public Invitation verifyInvitation(String id, String addressee) throws Exception {
		// 若邀请存不存在、受邀人不符，则无法注册
		Invitation invitation = invitationDao.selectById(id);
		if ((null == invitation) || !addressee.equalsIgnoreCase(invitation.getAddressee())) {
			throw new Exception(wnxLocale.getMessage("invitation.invalid"));
		}

		// 判断用户是否已经注册
		if (Invitation.STATUS_ACCEPTED.equals(invitation.getStatus())) {
			throw new Exception(wnxLocale.getMessage("invitation.accepted"));
		}

		return invitation;
	}

}
