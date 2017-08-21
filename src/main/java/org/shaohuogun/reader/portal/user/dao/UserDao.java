package org.shaohuogun.reader.portal.user.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

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

}
