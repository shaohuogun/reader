package org.shaohuogun.reader.portal.ebook.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.shaohuogun.common.Model;
import org.shaohuogun.reader.portal.ebook.model.Ebook;
import org.springframework.stereotype.Component;

@Component
public class EbookDao {

	private final SqlSession sqlSession;

	public EbookDao(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	public void insert(Ebook ebook) {
		sqlSession.insert("org.shaohuogun.reader.portal.ebook.dao.EbookMapper.insert", ebook);
	}

	public Ebook selectById(String id) {
		return sqlSession.selectOne("org.shaohuogun.reader.portal.ebook.dao.EbookMapper.selectById", id);
	}

	public int countByChannelId(String channelId) {
		return sqlSession.selectOne("org.shaohuogun.reader.portal.ebook.dao.EbookMapper.countByChannelId", channelId);
	}

	public List<Model> selectByChannelId(String channelId, int offset, int limit) {
		RowBounds rowBounds = new RowBounds(offset, limit);
		return sqlSession.selectList("org.shaohuogun.reader.portal.ebook.dao.EbookMapper.selectByChannelId", channelId,
				rowBounds);
	}

	public int countByCreator(String creator) {
		return sqlSession.selectOne("org.shaohuogun.reader.portal.ebook.dao.EbookMapper.countByCreator", creator);
	}

	public List<Model> selectByCreator(String creator, int offset, int limit) {
		RowBounds rowBounds = new RowBounds(offset, limit);
		return sqlSession.selectList("org.shaohuogun.reader.portal.ebook.dao.EbookMapper.selectByCreator", creator, rowBounds);
	}

}
