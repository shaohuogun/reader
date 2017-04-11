package org.shaohuogun.reader.message.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import org.shaohuogun.reader.message.model.Content;

@Component
public class ContentDao {

	private final SqlSession sqlSession;

	public ContentDao(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	public void insert(Content content) {
		sqlSession.insert("org.shaohuogun.reader.message.dao.ContentMapper.insert", content);
	}

	public Content selectById(String id) {
		return sqlSession.selectOne("org.shaohuogun.reader.message.dao.ContentMapper.selectById", id);
	}

	public Content selectByMessageId(String messageId) {
		return sqlSession.selectOne("org.shaohuogun.reader.message.dao.ContentMapper.selectByMessageId", messageId);
	}

	public void update(Content content) {
		sqlSession.update("org.shaohuogun.reader.message.dao.ContentMapper.update", content);
	}

}
