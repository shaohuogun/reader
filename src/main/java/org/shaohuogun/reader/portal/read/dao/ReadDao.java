package org.shaohuogun.reader.portal.read.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.shaohuogun.common.Entity;
import org.shaohuogun.reader.portal.read.model.ReadingItem;
import org.shaohuogun.reader.portal.read.model.ReadingList;
import org.springframework.stereotype.Component;

@Component
public class ReadDao {

	private final SqlSession sqlSession;

	public ReadDao(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	public void insertReadingList(ReadingList readingList) {
		sqlSession.insert("org.shaohuogun.reader.portal.read.dao.ReadMapper.insertReadingList", readingList);
	}

	public ReadingList selectReadingListById(String id) {
		return sqlSession.selectOne("org.shaohuogun.reader.portal.read.dao.ReadMapper.selectReadingListById", id);
	}

	public List<Entity> selectReadingListsByCreator(String creator) {
		return sqlSession.selectList("org.shaohuogun.reader.portal.read.dao.ReadMapper.selectReadingListsByCreator", creator);
	}

	public int countReadingList() {
		return sqlSession.selectOne("org.shaohuogun.reader.portal.read.dao.ReadMapper.countReadingList");
	}

	public List<Entity> selectReadingLists(int offset, int limit) {
		RowBounds rowBounds = new RowBounds(offset, limit);
		return sqlSession.selectList("org.shaohuogun.reader.portal.read.dao.ReadMapper.selectReadingLists", rowBounds);
	}

	public void updateReadingList(ReadingList readingList) {
		sqlSession.update("org.shaohuogun.reader.portal.read.dao.ReadMapper.updateReadingList", readingList);
	}

	public void insertReadingItem(ReadingItem readingItem) {
		sqlSession.insert("org.shaohuogun.reader.portal.read.dao.ReadMapper.insertReadingItem", readingItem);
	}

	public ReadingItem selectReadingItemById(String id) {
		return sqlSession.selectOne("org.shaohuogun.reader.portal.read.dao.ReadMapper.selectReadingItemById", id);
	}

	public int countReadingItemByListId(String listId) {
		return sqlSession.selectOne("org.shaohuogun.reader.portal.read.dao.ReadMapper.countReadingItemByListId", listId);
	}

	public List<Entity> selectReadingItemsByListId(String listId, int offset, int limit) {
		RowBounds rowBounds = new RowBounds(offset, limit);
		return sqlSession.selectList("org.shaohuogun.reader.portal.read.dao.ReadMapper.selectReadingItemsByListId", listId,
				rowBounds);
	}

	public void updateReadingItem(ReadingItem readingItem) {
		sqlSession.update("org.shaohuogun.reader.portal.read.dao.ReadMapper.updateReadingItem", readingItem);
	}

}
