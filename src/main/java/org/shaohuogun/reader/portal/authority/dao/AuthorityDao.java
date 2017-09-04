package org.shaohuogun.reader.portal.authority.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

@Component
public class AuthorityDao {

	private final SqlSession sqlSession;

	public AuthorityDao(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

}
