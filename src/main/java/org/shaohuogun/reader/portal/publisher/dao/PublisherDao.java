package org.shaohuogun.reader.portal.publisher.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import org.shaohuogun.reader.portal.publisher.model.Publisher;

@Component
public class PublisherDao {

	private final SqlSession sqlSession;

	public PublisherDao(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	public void insert(Publisher publisher) {
		sqlSession.insert("org.shaohuogun.reader.portal.publisher.dao.PublisherMapper.insert", publisher);
	}

	public Publisher selectById(String id) {
		return sqlSession.selectOne("org.shaohuogun.reader.portal.publisher.dao.PublisherMapper.selectById", id);
	}

}
