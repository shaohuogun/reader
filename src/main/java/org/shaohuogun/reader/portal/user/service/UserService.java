package org.shaohuogun.reader.portal.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.shaohuogun.reader.portal.user.dao.UserDao;
import org.shaohuogun.reader.portal.user.model.User;

@Service
public class UserService {
	
	@Autowired
	private UserDao userDao;
	
	@Transactional
	public User createUser(User user) throws Exception {
		if (user == null) {
			throw new NullPointerException("User cann't be null.");
		}
		
		userDao.insert(user);
		return userDao.selectById(user.getId());
	}
	
	public User getUser(String id) throws Exception {
		if ((id == null) || id.isEmpty()) {
			throw new IllegalArgumentException("User id cann't be null or empty.");
		}
		
		return userDao.selectById(id);
	}
	
}
