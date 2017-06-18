package org.shaohuogun.reader.read.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.shaohuogun.common.Model;
import org.shaohuogun.reader.read.model.ReadingItem;
import org.shaohuogun.reader.read.model.ReadingList;
import org.springframework.stereotype.Component;

@Component
public class ReadDao {

	private final SqlSession sqlSession;

	public ReadDao(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	public void insertReadingList(ReadingList readingList) {
		sqlSession.insert("org.shaohuogun.reader.read.dao.ReadMapper.insertReadingList", readingList);
	}

	public ReadingList selectReadingListById(String id) {
		return sqlSession.selectOne("org.shaohuogun.reader.read.dao.ReadMapper.selectReadingListById", id);
	}

	public int countReadingListByCreator(String creator) {
		return sqlSession.selectOne("org.shaohuogun.reader.read.dao.ReadMapper.countReadingListByCreator", creator);
	}

	public List<Model> selectReadingListsByCreator(String creator, int offset, int limit) {
		RowBounds rowBounds = new RowBounds(offset, limit);
		return sqlSession.selectList("org.shaohuogun.reader.read.dao.ReadMapper.selectReadingListsByCreator", creator,
				rowBounds);
	}

	public void updateReadingList(ReadingList readingList) {
		sqlSession.update("org.shaohuogun.reader.read.dao.ReadMapper.updateReadingList", readingList);
	}

	public void insertReadingItem(ReadingItem readingItem) {
		sqlSession.insert("org.shaohuogun.reader.read.dao.ReadMapper.insertReadingItem", readingItem);
	}

	public ReadingItem selectReadingItemById(String id) {
		return sqlSession.selectOne("org.shaohuogun.reader.read.dao.ReadMapper.selectReadingItemById", id);
	}

	public int countReadingItemByListId(String listId) {
		return sqlSession.selectOne("org.shaohuogun.reader.read.dao.ReadMapper.countReadingItemByListId", listId);
	}

	public List<Model> selectReadingItemsByListId(String listId, int offset, int limit) {
		RowBounds rowBounds = new RowBounds(offset, limit);
		return sqlSession.selectList("org.shaohuogun.reader.read.dao.ReadMapper.selectReadingItemsByListId", listId,
				rowBounds);
	}

	public void updateReadingItem(ReadingItem readingItem) {
		sqlSession.update("org.shaohuogun.reader.read.dao.ReadMapper.updateReadingItem", readingItem);
	}

}
