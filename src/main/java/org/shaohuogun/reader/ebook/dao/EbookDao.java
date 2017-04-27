package org.shaohuogun.reader.ebook.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.shaohuogun.common.Model;
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

	public int countInChannel(String channelId) {
		return sqlSession.selectOne("org.shaohuogun.reader.ebook.dao.EbookMapper.countInChannel", channelId);
	}

	public List<Model> selectInChannel(String channelId, int offset, int limit) {
		RowBounds rowBounds = new RowBounds(offset, limit);
		return sqlSession.selectList("org.shaohuogun.reader.ebook.dao.EbookMapper.selectInChannel", channelId,
				rowBounds);
	}

}
