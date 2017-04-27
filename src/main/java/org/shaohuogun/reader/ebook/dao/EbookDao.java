package org.shaohuogun.reader.ebook.dao;

import org.apache.ibatis.session.SqlSession;
import org.shaohuogun.reader.ebook.model.Ebook;
import org.springframework.stereotype.Component;

@Component
public class EbookDao {
	
	private final SqlSession sqlSession;

	public EbookDao(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	public void insert(Ebook ebook) {
		sqlSession.insert("org.shaohuogun.reader.ebook.dao.EbookMapper.insert", ebook);
	}

	public Ebook selectById(String id) {
		return sqlSession.selectOne("org.shaohuogun.reader.ebook.dao.EbookMapper.selectById", id);
	}
	
}
