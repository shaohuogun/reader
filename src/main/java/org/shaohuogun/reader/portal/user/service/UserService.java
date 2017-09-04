package org.shaohuogun.reader.portal.user.service;

import java.util.List;

import org.shaohuogun.reader.portal.invitation.dao.InvitationDao;
import org.shaohuogun.reader.portal.invitation.model.Invitation;
import org.shaohuogun.reader.portal.invitation.service.InvitationService;
import org.shaohuogun.reader.portal.user.dao.UserDao;
import org.shaohuogun.reader.portal.user.model.Portrait;
import org.shaohuogun.reader.portal.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    
    @Autowired
    private InvitationService invitationService;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private InvitationDao invitationDao;	
	
	@Transactional
	public User createUser(User user) throws Exception {
		if (user == null) {
			throw new NullPointerException("User cann't be null.");
		}
		
		user.setStatus(User.STATUS_ENABLED);
		userDao.insert(user);
		
        // 将全部历史邀请状态进行更新
        List<Invitation> invitationList = invitationService
                .getInvitationsByAddressee(user.getEmail());
        if ((invitationList != null) && !invitationList.isEmpty()) {
            for (Invitation curInvitation : invitationList) {
                curInvitation.setStatus(Invitation.STATUS_ACCEPTED);
                invitationDao.update(curInvitation);
            }
        }
        
        return userDao.selectById(user.getId());
	}

	@Transactional(readOnly = true)
	public User getUser(String id) throws Exception {
		if ((id == null) || id.isEmpty()) {
			throw new IllegalArgumentException("User id cann't be null or empty.");
		}
		
		return userDao.selectById(id);
	}

    @Transactional(readOnly = true)
    public User getUserByEmail(String email) {
        return userDao.findUserByEmail(email);
    }

    @Transactional(readOnly = true)
    public List<User> queryUsers(final int firstResult, final int maxResults) {
        return userDao.queryUsers(firstResult, maxResults);
    }

    @Transactional(readOnly = true)
    public Portrait getPortraitByUserId(String userId) {
        return userDao.findPortraitByUserId(userId);
    }

    @Transactional(readOnly = true)
    public Portrait getPortrait(String id) {
        return userDao.findPortraitById(id);
    }

    @Transactional
    public void updatePortrait(Portrait portrait) {
        if (null == portrait) {
            return;
        }

        Portrait oldPortrait = getPortrait(portrait.getUserId());
        if (null == oldPortrait) {
            // 假如用户未曾上传过头像则新增
        	userDao.insertPortrait(portrait);
        } else {
            // 假如用户曾经上传过头像则更新
            oldPortrait.setContent(portrait.getContent());
            userDao.updatePortrait(oldPortrait);
        }
    }

}
