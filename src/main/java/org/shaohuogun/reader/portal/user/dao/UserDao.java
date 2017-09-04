package org.shaohuogun.reader.portal.user.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;
import org.shaohuogun.reader.portal.user.model.Portrait;
import org.shaohuogun.reader.portal.user.model.User;

@Component
public class UserDao {

	private final SqlSession sqlSession;

	public UserDao(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	public void insert(User user) {
		sqlSession.insert("org.shaohuogun.reader.portal.user.dao.UserMapper.insert", user);
	}

	public User selectById(String id) {
		return sqlSession.selectOne("org.shaohuogun.reader.portal.user.dao.UserMapper.selectById", id);
	}

	public User findUserByEmail(String email) {
		return null;
	}

	public List<User> queryUsers(int firstResult, int maxResults) {
		return null;
	}
	
	public void insertPortrait(Portrait portrait) {
		sqlSession.insert("org.shaohuogun.reader.portal.user.dao.UserMapper.insertPortrait", portrait);
	}
	
	public Portrait findPortraitById(String id) {
		return null;
	}

	public Portrait findPortraitByUserId(String userId) {
		return null;
	}
	
	public void updatePortrait(Portrait portrait) {
		sqlSession.update("org.shaohuogun.reader.portal.user.dao.UserMapper.updatePortrait", portrait);
	}

}
